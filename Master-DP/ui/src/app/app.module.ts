import { TabsModule } from 'ngx-tabset';
import { NgModule } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';
import { AccordionModule } from "ngx-accordion";
import { StickyNavModule } from 'ng2-sticky-nav';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHomeComponent } from './components/pages/main-home/main-home.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CvCtaComponent } from './components/common/cv-cta/cv-cta.component';
import { BlogComponent } from './components/common/blog/blog.component';
import { FeaturedJobsComponent } from './components/common/featured-jobs/featured-jobs.component';
import { CareerTipsComponent } from './components/common/career-tips/career-tips.component';
import { TopCompanyComponent } from './components/common/top-company/top-company.component';
import { PricingComponent } from './components/common/pricing/pricing.component';
import { RecentJobsComponent } from './components/common/recent-jobs/recent-jobs.component';
import { JobsCategoriesComponent } from './components/common/jobs-categories/jobs-categories.component';
import { MainBannerComponent } from './components/common/main-banner/main-banner.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { FunfactsComponent } from './components/common/funfacts/funfacts.component';
import { ServicesComponent } from './components/common/services/services.component';
import { AboutComponent } from './components/common/about/about.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { PricingPageComponent } from './components/pages/pricing-page/pricing-page.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { TermsConditionsPageComponent } from './components/pages/terms-conditions-page/terms-conditions-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { EventListingsPageComponent } from './components/pages/event-listings-page/event-listings-page.component';
import { JobDetailsPageComponent } from './components/pages/job-details-page/job-details-page.component';
import { CompaniesPageComponent } from './components/pages/companies-page/companies-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { CategoriesPageComponent } from './components/pages/categories-page/categories-page.component';
import { CandidatesPageComponent } from './components/pages/candidates-page/candidates-page.component';
import { CandidateDetailsPageComponent } from './components/pages/candidate-details-page/candidate-details-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {StringToHtmlDecoderPipe} from "../pipes/StringToHtmlDecoder.pipe";
import {PaymentPageComponent} from "./components/pages/payment/payment-page.component";
import {FileUploadComponent} from "./components/file/image-upload/file-upload.component";
import {WriteAReviewComponent} from "./components/common/write-a-review/write-a-review.component";
import { AngularMaterialModule } from './additional-modules/angular-material.module';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MyEventsListingsPageComponent } from './components/pages/my-events-listings-page/my-events-listings-page.component';
import { MyOragisedEventsListingsPageComponent } from './components/pages/my-organised-events-listings-page/my-organised-events-listings-page.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MapComponent } from './components/common/map/map.component';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { CardSliderComponent } from './card-slider/card-slider.component';
import { ToastrModule } from 'ngx-toastr';
import { NgChartsModule } from 'ng2-charts';
import { TicketChartComponent } from './components/pages/chart/chart.component';
import { EventInfoPageComponent } from './components/pages/event-info-page/event-info-page.component';
import { SuggestedPageComponent } from './components/pages/suggested-page/suggested-page.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
  };
  
@NgModule({
    declarations: [
        AppComponent,
        MainHomeComponent,
        FooterComponent,
        CvCtaComponent,
        BlogComponent,
        FeaturedJobsComponent,
        CareerTipsComponent,
        TopCompanyComponent,
        PricingComponent,
        PaymentPageComponent,
        RecentJobsComponent,
        JobsCategoriesComponent,
        MainBannerComponent,
        NavbarComponent,
        AboutPageComponent,
        FileUploadComponent,
        FunfactsComponent,
        ServicesComponent,
        AboutComponent,
        ContactPageComponent,
        PricingPageComponent,
        NotFoundComponent,
        PrivacyPolicyPageComponent,
        TermsConditionsPageComponent,
        LoginPageComponent,
        RegisterPageComponent,
        FaqPageComponent,
        BlogDetailsPageComponent,
        SuggestedPageComponent,
        EventListingsPageComponent,
        JobDetailsPageComponent,
        EventInfoPageComponent,
        CompaniesPageComponent,
        ProfilePageComponent,
        CategoriesPageComponent,
        CandidatesPageComponent,
        CandidateDetailsPageComponent,
        StringToHtmlDecoderPipe,
        WriteAReviewComponent,
        MyEventsListingsPageComponent,
        MyOragisedEventsListingsPageComponent,
        MapComponent,
        CardSliderComponent,
        TicketChartComponent
        ],
    imports: [
        BrowserModule,
        NgChartsModule,
        AppRoutingModule,
        CarouselModule,
        AccordionModule,
        BrowserAnimationsModule,
        NgxScrollTopModule,
        NgxSmartModalModule.forRoot(),
        StickyNavModule,
        TabsModule,
        NgxEditorModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        NgxMatTimepickerModule,
        NgxMapLibreGLModule,
        NgxMatTimepickerModule.setLocale('bg-BG'),
        NgxMaskModule.forRoot(maskConfigFunction),
        ToastrModule.forRoot({
          closeButton: true,
          timeOut: 15000, // 15 seconds
          progressBar: true,
        }),

    ],
    providers: [HttpClientModule],
    bootstrap: [AppComponent]
})
export class AppModule { }
