import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image
} from 'react-native';
import { normalize } from '../../../../Constant';
import Test from '../../../screens/LoginScreen/Test';
// import console = require('console');

export default Circle = props => {

    var numberOfCircleHalfRow = 11;
    let horizontalPadding = 20;

    let horizontalSpacing = 2;
    // let verticalSpacing = 1;

    let numberOfCircle = 26 + (3 * (numberOfCircleHalfRow - 1));

    const {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    } = Dimensions.get('window');


    var lastRowCountOfCircle = (numberOfCircleHalfRow * 3) + (numberOfCircleHalfRow / 2);

    var circleDimension = (SCREEN_WIDTH - (horizontalPadding * 2) - ((lastRowCountOfCircle - 1) * horizontalSpacing)) / lastRowCountOfCircle;

    let array = [];


    // let counter = 0;
    let numberOfRow = 1;
    // let numberOfColumn = 1;

    var emptyEndCordinate = SCREEN_WIDTH - horizontalPadding - circleDimension;// horizontalPadding + (circleDimension * (numberOfCircleHalfRow) * 2) + (horizontalSpacing * (numberOfCircleHalfRow ) * 2)// + (circleDimension / 2);
    var emptyStartCordinate = horizontalPadding;// horizontalPadding + (circleDimension * (numberOfCircleHalfRow-1)) + (horizontalSpacing * (numberOfCircleHalfRow - 1))// - (circleDimension / 2);

    var diameter = (emptyEndCordinate - emptyStartCordinate) / 2;

    // var cordinateX = emptyStartCordinate - circleDimension;
    var cordinateY = 0;


    let angle = 0;

    // let numberOfCircleMade = ((22 / 7) * diameter) / (circleDimension + horizontalSpacing);
    // let angle = (((22 / 7) * diameter) % (circleDimension + horizontalSpacing))/2;
    let increasingAngle = 180 / numberOfCircle;// increasingAngle = 180 / (numberOfCircleMade + numberOfCircleMade - 1);

    let innerArray = [];
    for (let i = 0; i < 462; i++) {

        if (angle >= 181) {
            numberOfRow++;

            angle = 0;
            numberOfCircle = numberOfCircle - 3;
            // angle = numberOfRow%2===0 ? 180 : 0;
            increasingAngle = 180 / numberOfCircle;
            // let inc = 180 / numberOfCircleMade;
            // increasingAngle = increasingAngle;// numberOfRow%2===0 ? (0-inc) : inc;

            // angle = startAngle;
            // increasingAngle = 180 / (((22 / 7) * diameter) / (circleDimension + (horizontalSpacing)));
            // numberOfColumn = numberOfColumn + 1.5;
            diameter = diameter - circleDimension - horizontalSpacing;

            array.push(innerArray);
        }
        let x = (diameter) * Math.cos(angle * 0.0174533);

        let y = (diameter) * Math.sin(angle * 0.0174533);

        console.log(x);
        console.log(y);
        cordinateY = y;
        // emptyEndCordinate = y;
        // emptyStartCordinate =  y;

        // innerArray.push({
        //     backgroundColor: 'red',
        //     position: 'absolute',
        //     width: circleDimension,
        //     height: circleDimension,
        //     left: (SCREEN_WIDTH / 2) + x  - (circleDimension / 2),
        //     top: 200 - cordinateY - (circleDimension / 2),
        //     borderRadius: (circleDimension / 2.0)
        // });

        innerArray.push(<View style={{
            backgroundColor: 'red',
            position: 'absolute',
            width: circleDimension,
            height: circleDimension,
            left: (SCREEN_WIDTH / 2) + x - (circleDimension / 2),
            top: 200 - cordinateY - (circleDimension / 2),
            borderRadius: (circleDimension / 2.0)
        }} />)

        angle = angle + increasingAngle;
    }
    

    
    return (
        <View style={{
            position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'white'
        }}>
            {array}
        </View>
    );

}

// Circle2 = props => {

//     var numberOfCircleHalfRow = 18;
//     let horizontalPadding = 20;

//     let horizontalSpacing = 2;
//     let verticalSpacing = 2;


//     const {
//         width: SCREEN_WIDTH,
//         height: SCREEN_HEIGHT,
//     } = Dimensions.get('window');


//     var lastRowCountOfCircle = (numberOfCircleHalfRow * 3);

//     var circleDimension = (SCREEN_WIDTH - (horizontalPadding * 2) - ((lastRowCountOfCircle - 1) * horizontalSpacing)) / lastRowCountOfCircle;

//     let array = [];
//     var cordinateX = horizontalPadding;
//     var cordinateY = horizontalSpacing;

//     // let counter = 0;
//     let numberOfRow = 1;
//     let numberOfColumn = 1;

//     var emptyEndCordinate = horizontalPadding + (circleDimension * numberOfCircleHalfRow * 2) + (horizontalSpacing * (numberOfCircleHalfRow - 1) * 2);
//     var emptyStartCordinate = horizontalPadding + (circleDimension * numberOfCircleHalfRow) + (horizontalSpacing * (numberOfCircleHalfRow - 1));

//     var diameter = (emptyEndCordinate - emptyStartCordinate);
//     // console.log(Math.sign(22/7));
//     console.log(emptyEndCordinate);
//     console.log(diameter);
//     // let lengthOfCircle = horizontalPadding + 

//     // let lastStartCordinates = cordinateX;
//     var increasingParam = 0;
//     // var emptyEndCordinate
//     for (let i = 0; i < 428; i++) {

//         array.push(<View style={{
//             backgroundColor: 'red',
//             position: 'absolute',
//             width: circleDimension,
//             height: circleDimension,
//             left: cordinateX,
//             top: 250 - cordinateY,
//             borderRadius: (circleDimension / 2.0)
//         }} />)

//         let isDoubleRow = emptyEndCordinate > (emptyStartCordinate + (increasingParam))
//         console.log('asda' + increasingParam);

//         if (numberOfRow === numberOfCircleHalfRow) {
//             //end of first half


//             if (!isDoubleRow) {
//                 cordinateY = cordinateY + verticalSpacing + circleDimension;

//                 // horizontalSpacing = 1
//                 // let y_axis = Math.pow(cordinateY, 2);
//                 // let radius = Math.pow(diameter / 2, 2);
//                 console.log('rrrrrr');
//                 // console.log('rrrrrr' + radius);
//                 // increasingParam = horizontalPadding + Math.sqrt(y_axis - radius) //Math.sign(numberOfRow);
//                 // console.log('isDoubleRow');
//                 numberOfCircleHalfRow = numberOfCircleHalfRow - 4;
//                 if (432-i < numberOfCircleHalfRow) {
//                     numberOfCircleHalfRow = 432-i;
//                 }
//                 // cordinateX = horizontalPadding + (circleDimension * lastRowCountOfCircle) + (horizontalSpacing * lastRowCountOfCircle);

//                 cordinateX =  (SCREEN_WIDTH - ((circleDimension * (numberOfCircleHalfRow)) + (horizontalSpacing * (numberOfCircleHalfRow - 1))))/2;

//                 numberOfColumn++;
//                 numberOfRow = 0;
//             } else {
//                 cordinateX = emptyEndCordinate;
//             }
//         } else if (numberOfRow === (numberOfCircleHalfRow * 2)) {
//             //end of second half
//             cordinateY = cordinateY + verticalSpacing + circleDimension;

//             let y_axis = Math.pow(cordinateY, 2);
//             let radius = Math.pow(diameter / 2, 2);
//             let diffrences = radius - y_axis;

//             let x_axis = Math.sqrt(diffrences < 0 ? -diffrences : diffrences);
//             console.log('sssss' + y_axis);
//             console.log('sssss' + radius);
//             let pp1 = x_axis - ((diameter/2)*3) - horizontalPadding;// - horizontalPadding;
//             pp1 = pp1 < 0 ? 0-pp1 : pp1;
//             // increasingParam = pp - lastStartCordinates;
//             console.log('sssss' + pp1);
//             // emptyStartCordinate > 
//             // let diffrences2 = radius + y_axis;
//             // let x_axis2 = Math.sqrt(diffrences2 < 0 ? 0-diffrences2 : diffrences2);
//             // console.log('pp2' + y_axis);
//             // console.log('pp2' + radius);
//             // let pp2 = x_axis2 - diameter - horizontalPadding;// - horizontalPadding;
//             // pp2 = pp2 < 0 ? 0-pp2 : pp2;
//             // console.log('pp2' + pp2);

//             // let diffrence =  increasingParam - cordinateX);
//             console.log('emptyStartCordinate' + emptyStartCordinate);
//             emptyEndCordinate = (emptyEndCordinate - (pp1 - emptyStartCordinate));
//             emptyStartCordinate = pp1 >= emptyStartCordinate ? pp1 : emptyStartCordinate + pp1;/// emptyStartCordinate +  increasingParam;

//             cordinateX = emptyStartCordinate - (diameter);// emptyStartCordinate - ((circleDimension * numberOfCircleHalfRow) + (horizontalSpacing * (numberOfCircleHalfRow - 1)));


//             numberOfColumn++;
//             numberOfRow = 0;

//             let isDoubleRow = emptyEndCordinate > (emptyStartCordinate + increasingParam)
//             if (!isDoubleRow) {
//                 numberOfCircleHalfRow = (numberOfCircleHalfRow * 2);
//                 cordinateX =  (SCREEN_WIDTH - ((circleDimension * (numberOfCircleHalfRow)) + (horizontalSpacing * (numberOfCircleHalfRow - 1))))/2;
//             }

//             console.log(emptyStartCordinate);
//             console.log(emptyEndCordinate);

//         } else {
//             cordinateX = cordinateX + horizontalSpacing + circleDimension;
//         }
//         numberOfRow++;

//     }
//     return (
//         <View style={{
//             position: 'absolute', left: 0, right: 0, top: 0, bottom: 0
//         }}>
//             {array}
//         </View>
//     );

// }



