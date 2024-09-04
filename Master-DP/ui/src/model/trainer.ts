export class Trainer {
    id: number;
    gender: string;
    telephone: string;
    city: string;
    about: string;
    yearsExperience: string;
    certifications: string;
    category: string;

    constructor(id:number, gender: string, telephone: string, city: string, about: string, yearsExperience: string, certifications: string, category: string) {
        this.id = id;
        this.gender = gender;
        this.telephone = telephone;
        this.city = city;
        this.about = about;
        this.yearsExperience = yearsExperience;
        this.certifications = certifications;
        this.category = category;
    }
}