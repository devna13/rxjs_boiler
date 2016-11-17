import $ from 'jquery';
import Rx from 'rxjs/Rx';

const output = $('#output');
function print(html) {
    output.html(html);
}

/**
 * Observable from Events
 */
const btn = $('#btn');
const btnStream$ = Rx.Observable.fromEvent(btn, 'click');
btnStream$.subscribe(
    (event) => { console.log(`clicked:`, event, event.target.innerHTML); },
    (error) => { console.log(error); },
    () => { console.log('Completed'); }
);

/**
 * Observable from Events
 */
const input = $('#input');
Rx.Observable.fromEvent(input, 'keyup').subscribe(
    (event) => { console.log(`Typed:`, event.target.value); },
    (error) => { console.log(error); },
    () => { console.log('Completed'); }
);

/**
 * Observable from Events
 */
const documentStream$ = Rx.Observable.fromEvent(document, 'mousemove');
documentStream$.subscribe(
    (e) => {
        print(`<h3> X: ${e.clientX} Y: ${e.clientY} </h3>`);
    },
    (error) => { console.log(error); },
    () => { console.log('Completed'); }
);

/**
 * Observable from array
 */

const nums = [1,2,3,4,5]
Rx.Observable.from(nums).subscribe(
    v => { console.log(v); },
    err => { console.log(err); },
    () => { console.log('Completed'); }
);

/**
 * Observable from array
 */

const colors = [
	{
		color: "red",
		value: "#f00"
	},
	{
		color: "green",
		value: "#0f0"
	},
	{
		color: "blue",
		value: "#00f"
	}
]
Rx.Observable.from(colors).subscribe(
    v => { console.log(v); },
    err => { console.log(err); },
    () => { console.log('Completed'); }
);

/**
 * Observable Source
 */
console.log('--------------------------------')
const source$ = new Rx.Observable(observer => {
    observer.next('hi');

    observer.error(new Error('something bad happened'));
    
    setTimeout(() => {
        observer.next('some other value'); 
        observer.complete();
    },1000);

});

source$
    .catch(err => Rx.Observable.of(err))  
    .subscribe(
    v => { console.log(v); },
    err => { console.log(err); },
    () => { console.log('Completed'); }
);
