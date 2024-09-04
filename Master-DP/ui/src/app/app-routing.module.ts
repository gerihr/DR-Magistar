import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { CandidateDetailsPageComponent } from './components/pages/candidate-details-page/candidate-details-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { MainHomeComponent } from './components/pages/main-home/main-home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { TermsConditionsPageComponent } from './components/pages/terms-conditions-page/terms-conditions-page.component';
import {RegisterPageComponent} from "./components/pages/register-page/register-page.component";
import {PaymentPageComponent} from "./components/pages/payment/payment-page.component";
import { MyEventsListingsPageComponent } from './components/pages/my-events-listings-page/my-events-listings-page.component';
import { MyOragisedEventsListingsPageComponent } from './components/pages/my-organised-events-listings-page/my-organised-events-listings-page.component';
import { AuthGuard } from './auth.guard';
import { EventListingsPageComponent } from './components/pages/event-listings-page/event-listings-page.component';
import { EventInfoPageComponent } from './components/pages/event-info-page/event-info-page.component';
import { SuggestedPageComponent } from './components/pages/suggested-page/suggested-page.component';

const routes: Routes = [
    {path: '', component: MainHomeComponent},
    {path: 'event-listings', component: EventListingsPageComponent},
    {path: 'event-listings/:catId', component: EventListingsPageComponent},
    {path: 'event-listings/:catId/:typeId', component: EventListingsPageComponent},
    {path: 'event-listings-filter/:event', component: EventListingsPageComponent},
    {path: 'my-organised-events-listings', component: MyOragisedEventsListingsPageComponent, canActivate: [AuthGuard], data: {roles: ['organiser']}},
    {path: 'my-events', component: MyEventsListingsPageComponent, canActivate: [AuthGuard], data: {roles: ['user']}},
    {path: 'post-an-event', component: EventInfoPageComponent, canActivate: [AuthGuard], data: {roles: ['organiser']}},
    {path: 'post-an-event/:id', component: EventInfoPageComponent, canActivate: [AuthGuard], data: {roles: ['organiser']}},
    {path: 'payment', component: PaymentPageComponent, canActivate: [AuthGuard], data: {roles: ['user']}},
    {path: 'event-details/:id', component: CandidateDetailsPageComponent},
    {path: 'faq', component: FaqPageComponent},
    {path: 'privacy-policy', component: PrivacyPolicyPageComponent},
    {path: 'terms-conditions', component: TermsConditionsPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'suggested-events', component: SuggestedPageComponent, canActivate: [AuthGuard], data: {roles: ['user']}},
    {path: 'blog-details', component: BlogDetailsPageComponent},
    {path: 'contact', component: ContactPageComponent},

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
