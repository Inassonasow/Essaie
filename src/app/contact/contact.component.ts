import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { Router } from '@angular/router';
import {  inject,  signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ProductsService } from "app/products/data-access/products.service";
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';



@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CardModule,RouterLink, ButtonModule, DataViewModule,DialogModule,TagModule,CommonModule,FormsModule,InputTextModule,InputTextareaModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})


  export class ContactComponent {
    email: string = '';
    message: string = '';
    emailError: string = '';
    messageError: string = '';


    // Méthode pour calculer le nombre de mots
  get wordCount(): number {
    return this.message.split(/\s+/).filter(Boolean).length;
  }

     // Validation de l'email en temps réel
     validateEmail() {
      const words = this.message.split(/\s+/).filter(Boolean);
    if (words.length > 300) {
      // Tronquer le message à 300 mots
      this.message = words.slice(0, 300).join(' ');
      this.messageError = 'Le message ne doit pas dépasser 300 mots.';
    } else {
      this.messageError = '';
    }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (this.email === '') {
        this.emailError = ''; // Pas d'erreur si le champ est vide
      } else {
        this.emailError = emailPattern.test(this.email) ? '' : 'Veuillez entrer une adresse email valide.';
      }
    }


  // Validation du message en temps réel
  validateMessage() {
    const words = this.message.split(/\s+/).filter(Boolean);
    if (words.length > 300) {
      // Tronquer le message à 300 mots
      this.message = words.slice(0, 300).join(' ');
      this.messageError = 'Le message ne doit pas dépasser 300 mots.';
    } else {
      this.messageError = '';
    }
  }
  
  envoyerMessage() {
    // Réinitialiser les messages d'erreur
    this.emailError = '';
    this.messageError = '';

    // Validation des champs obligatoires
    if (this.email === '') {
      this.emailError = 'Veuillez entrer votre adresse email.';
    }
    if (this.message === '') {
      this.messageError = 'Veuillez entrer un message.';
    }

    // Si l'email ou le message est vide, ne pas envoyer
    if (this.emailError || this.messageError) {
      return;
    }

    // Validation de l'email et du message
    this.validateEmail();
    this.validateMessage();

    // Si des erreurs sont présentes, ne pas envoyer
    if (this.emailError || this.messageError) {
      return;
    }

    // Si tout est valide, envoyer le message
    console.log('Email:', this.email);
    console.log('Message:', this.message);
    alert('Message envoyé avec succès !');
  }
}