import { Injectable } from "@angular/core";
import { EventService } from "./event.service";
import * as brain from 'brain.js';

@Injectable({
  providedIn: 'root',
})
export class RecommendationsService {

  constructor(private eventService: EventService) {}

  prepareTrainingData() {
    let likedEvents = this.eventService.savedEventsUser.getValue();
    let allEvents = this.eventService.allEvents.getValue();
  
    // Count how many saved events there are for each category and type
    const categoryCounts = new Map<string, number>();
    const typeCounts = new Map<string, number>();
  
    likedEvents.forEach(event => {
      categoryCounts.set(event.category, (categoryCounts.get(event.category) || 0) + 1);
      typeCounts.set(event.type, (typeCounts.get(event.type) || 0) + 1);
    });
  
    // Total number of saved events
    const totalLikedEvents = likedEvents.length;
  
    // Calculate proportions for each category and type
    const categoryScores = new Map<string, number>();
    const typeScores = new Map<string, number>();
  
    categoryCounts.forEach((count, category) => {
      categoryScores.set(category, count / totalLikedEvents);
    });
  
    typeCounts.forEach((count, type) => {
      typeScores.set(type, count / totalLikedEvents);
    });
  
    // Prepare training data
    const likedData = likedEvents.map(event => ({
      input: {
        category: categoryScores.get(event.category) || 0,
        type: typeScores.get(event.type) || 0
      },
      output: { liked: 1 }
    }));
  
    const unlikedData = allEvents
      .filter(event => !likedEvents.some(e => e.id === event.id))
      .map(event => ({
        input: {
          category: categoryScores.get(event.category) || 0,
          type: typeScores.get(event.type) || 0
        },
        output: { liked: 0 }
      }));
  
    return [...likedData, ...unlikedData];
  }
  

  getData() {
    const net = new brain.NeuralNetwork();
    const trainingData = this.prepareTrainingData();
    net.train(trainingData);
    return net; // Return the trained network
  }

  getRecommendations(net, allEvents, topN): Event[] {
    let likedEvents = this.eventService.savedEventsUser.getValue();
  
    // Create score maps for categories and types based on liked events
    const categoryScores = new Map<string, number>();
    const typeScores = new Map<string, number>();
  
    likedEvents.forEach(event => {
      categoryScores.set(event.category, (categoryScores.get(event.category) || 0) + 1);
      typeScores.set(event.type, (typeScores.get(event.type) || 0) + 1);
    });

    const totalLikedEvents = likedEvents.length;

    // Normalize the scores
    const normalizedCategoryScores = new Map<string, number>();
    const normalizedTypeScores = new Map<string, number>();

    categoryScores.forEach((count, category) => {
      normalizedCategoryScores.set(category, count / totalLikedEvents);
    });

    typeScores.forEach((count, type) => {
      normalizedTypeScores.set(type, count / totalLikedEvents);
    });
  
    // Get today's date for comparison
    const today = new Date();
  
    // Calculate scores for all events
    const scores = allEvents.map(event => {
      const categoryScore = normalizedCategoryScores.get(event.category) || 0;
      const typeScore = normalizedTypeScores.get(event.type) || 0;

      const input = {
        category: categoryScore,
        type: typeScore
      };

      const networkScore = net.run(input).liked;

      // Additional score calculation to emphasize similarity
      const similarityScore = (categoryScore + typeScore) / 2;
      
      return {
        event,
        score: networkScore * similarityScore
      };
    });
  
    // Filter out past events and those already liked
    const filteredEvents = scores
      .filter(item => {
        const eventDate = new Date(item.event.date);
        return eventDate > today && !likedEvents.some(e => e.id === item.event.id);
      });
  
    // Sort by score and select top N recommendations
    const uniqueRecommendations = Array.from(
      new Set(filteredEvents.sort((a, b) => b.score - a.score).map(item => item.event.id))
    )
    .slice(0, topN)
    .map(id => filteredEvents.find(item => item.event.id === id).event);
  
    return uniqueRecommendations;
  }
  
}
