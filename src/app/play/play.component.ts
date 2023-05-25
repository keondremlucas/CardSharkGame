import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Card } from '../Models/Card';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  playForm!: FormGroup;
  activeImage1: string ="";
  activeImage2: string = "";
  cardimageArray: string[] = [];
  streak: number = 0;
  correct: boolean = false;
  wrong: boolean = false;
  cardHolder: Card[] = [];
  cardHolder2: Card[] = [];
  suit = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  values = ['2', '3', '4', '5', '6', '7', '8', '9','10','K','J', 'Q', 'A'];

  ngOnInit(): void {
    this.playForm = this.fb.group({
      answer: [false,[Validators.required]]
    })
    this.playForm.controls.answer.setValue(false);

    this.cardGenerator();


  }

  cardGenerator(){

    let card1 : Card = ({suit: '', value: '', imageurl: ''});
    let card2 : Card = ({suit: '', value: '', imageurl: ''});

    let card1s = this.suit[Math.floor(Math.random()*3)];
    let card1v = this.values[Math.floor(Math.random()*10)]
    card1.suit=card1s;
    card1.value=card1v;

    console.log(card1.suit + "" + card1.value);

    card1.imageurl=`assets/images/${card1.suit}/${card1.value}.png`;
    this.cardimageArray.push(card1.imageurl);
    this.cardHolder.push(card1);

    let card2s = this.suit[Math.floor(Math.random()*3)];
    let card2v = this.values[Math.floor(Math.random()*10)]
    card2.suit=card2s;
    card2.value=card2v;

    console.log(card2.suit + "" + card2.value);

    card2.imageurl=`assets/images/${card2s}/${card2v}.png`;
    this.cardimageArray.push(card2.imageurl);
    this.cardHolder.push(card2);

    console.log(this.cardHolder);

    if (card1.value == card2.value || (card1.value =='K' && card2.value =='10'))
    { this.cardHolder = []
      this.cardGenerator();
    }

  }
  onSubmit(event: { submitter: { name: string; }; }){

      if(event.submitter.name == "Higher")
      { console.log("Higher");
      this.cardHolder2 = this.cardHolder;

      if( parseInt(this.cardHolder[1].value)> parseInt(this.cardHolder[0].value) || this.cardHolder[0].value == 'A'|| this.cardHolder[1].value == 'K'  || this.cardHolder[1].value == 'Q' || this.cardHolder[1].value == 'J' || parseInt(this.cardHolder[1].value) == 10){
        this.streak = this.streak+1;
        this.correct = true;
        this.wrong = false;
        this.cardHolder = [];
        this.cardGenerator();
      }
      else{
        this.wrong = true;
        this.correct = false;
        this.streak=0;
        this.cardHolder = [];
        this.cardGenerator();
      }
    }
    if(event.submitter.name == "Lower")
    { console.log("Lower");
      console.log(this.cardHolder[1].value);
      
      this.cardHolder2 = this.cardHolder;

      if(parseInt(this.cardHolder[1].value) < parseInt(this.cardHolder[0].value) || this.cardHolder[0].value == 'A' || this.cardHolder[0].value == 'K'  || this.cardHolder[0].value == 'Q' || this.cardHolder[0].value == 'J' || parseInt(this.cardHolder[0].value) == 10)
      {
        this.correct=true;
        this.wrong = false;
        this.streak++;

        this.cardHolder = [];
        this.cardGenerator();
      }
      else
      {
        this.wrong = true;
        this.correct = false;
        this.streak=0;
        this.cardHolder = [];
        this.cardGenerator();
      }
    }


  }


}
