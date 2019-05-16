import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image,
    FlatList
} from 'react-native';
import { normalize } from '../../../../Constant';
import Test from '../../../screens/LoginScreen/Test';


export default Circle = props => {

    const {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    } = Dimensions.get('window');

    var numberOfCircleHalfRow = 13;

    let actualNumberOfCircle = 12;
    let horizontalPadding = (SCREEN_WIDTH - props.Height) / 2// 50;
    // alert(horizontalPadding)
    let horizontalSpacing = 1;
    // let verticalSpacing = 1;

    let numberOfCircle = 26 + (3 * (actualNumberOfCircle - 1));




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
    for (let i = 0; i < 546; i++) {

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
            innerArray = [];
        }
        let x = (diameter) * Math.cos(angle * 0.0174533);

        let y = (diameter) * Math.sin(angle * 0.0174533);

        // console.log(x);
        // console.log(y);
        cordinateY = y;
        // emptyEndCordinate = y;
        // emptyStartCordinate =  y;

        innerArray.push({
            backgroundColor: 'red',
            position: 'absolute',
            width: circleDimension,
            height: circleDimension,
            left: (SCREEN_WIDTH / 2) + x - (circleDimension / 2),
            bottom: cordinateY - (circleDimension / 2),
            borderRadius: (circleDimension / 2.0)
        });

        // innerArray.push(<View style={{
        //     backgroundColor: 'red',
        //     position: 'absolute',
        //     width: circleDimension,
        //     height: circleDimension,
        //     left: (SCREEN_WIDTH / 2) + x - (circleDimension / 2),
        //     top: 200 - cordinateY - (circleDimension / 2),
        //     borderRadius: (circleDimension / 2.0)
        // }} />)

        angle = angle + increasingAngle;
    }
    array.push(innerArray);
    // console.log(array);

    let globalArray = [];

    let half = Math.round(array[array.length - 1].length / 2);
    // console.log(half);
    for (let i = 0; i < array[array.length - 1].length; i++) {

        if (half > i) {
            for (let j = 0; j < array.length; j++) {
                globalArray.push(array[j][i]);
            }
        } else if (i > half) {

            for (let j = 0; j < array.length; j++) {
                globalArray.push(array[j][i + (3 * (array.length - j - 1))]);

                // globalArray.push(array[j][i]);
            }
        } else {
            // continue;
            // console.log('zz--------');

            let counter = half;
            while (counter <= (half + (3 * (array.length - 1)))) {

                let dec = (counter - half);
                dec = ((dec - (dec % 3)) / 3)


                // console.log(dec);
                for (let z = 0; z < (array.length - dec - 1); z++) {

                    // console.log("z");
                    // console.log(z);
                    globalArray.push(array[z][counter]);
                }
                counter = counter + 1;
            }
            for (let j = 0; j < array.length; j++) {
                globalArray.push(array[j][i + (3 * (array.length - j - 1))]);
            }
        }
    }

    globalArray = globalArray.reverse();
    let showArray = [];
    // 10


    let showDetailsData = props.data;
        // [{
        //     "groupName": "Cong+",
        //     "rangeMin": 1063,
        //     "rangeMax": 1103,
        //     "exitSeats": 200,
        //     "leadingSeats": null,
        //     "wonSeats": null,
        //     "totalSeats": null,
        //     "lastElectionSeats": 0,
        //     "plusMinusSymbol": 300,
        //     "stateName": null,
        //     "categoryLogoPath": null,
        //     "categoryLogoData": null
        // }, {
        //     "groupName": "BJP+",
        //     "rangeMin": 2,
        //     "rangeMax": 22,
        //     "exitSeats": 20,
        //     "leadingSeats": null,
        //     "wonSeats": 20,
        //     "totalSeats": null,
        //     "lastElectionSeats": 0,
        //     "plusMinusSymbol": 2,
        //     "stateName": null,
        //     "categoryLogoPath": null,
        //     "categoryLogoData": null
        // },{
        //     "groupName": "BJP+",
        //     "rangeMin": 2,
        //     "rangeMax": 22,
        //     "exitSeats": 2,
        //     "leadingSeats": null,
        //     "wonSeats": null,
        //     "totalSeats": null,
        //     "lastElectionSeats": 0,
        //     "plusMinusSymbol": 2,
        //     "stateName": null,
        //     "categoryLogoPath": null,
        //     "categoryLogoData": null
        // },{
        //     "groupName": "BJPP",
        //     "rangeMin": 2,
        //     "rangeMax": 22,
        //     "exitSeats": 2,
        //     "leadingSeats": null,
        //     "wonSeats": null,
        //     "totalSeats": null,
        //     "lastElectionSeats": 0,
        //     "plusMinusSymbol": 2,
        //     "stateName": null,
        //     "categoryLogoPath": null,
        //     "categoryLogoData": null
        // },{
        //     "groupName": "BJP",
        //     "rangeMin": 2,
        //     "rangeMax": 22,
        //     "exitSeats": 2,
        //     "leadingSeats": null,
        //     "wonSeats": null,
        //     "totalSeats": null,
        //     "lastElectionSeats": 0,
        //     "plusMinusSymbol": 2,
        //     "stateName": null,
        //     "categoryLogoPath": null,
        //     "categoryLogoData": null
        // }];
    let colorA = [
        {
            "color": "#ff9933",
            "text": "Bharatiya Janata Party",
            "seat": 200
        },
        {
            "color": "#00bfff",
            "text": "Indian National Congress",
            "seat": 100
        },
        {
            "color": "#00ff00",
            "text": "All India Trinamool Congress",
            "seat": 159
        },
        {
            "color": "#e3882d",
            "text": "Shiv Sena",
            "seat": 40
        },
        {
            "color": "#009900",
            "text": "All India Anna Dravida Munnetra Kazhagam",
            "seat": 0
        },
        {
            "color": "#006400",
            "text": "Biju Janata Dal",
            "seat": 0
        },
        {
            "color": "#ffc0cb",
            "text": "Telangana Rashtra Samithi",
            "seat": 0
        },
        {
            "color": "#ff0000",
            "text": "Samajwadi Party",
            "seat": 0
        },
        {
            "color": "#ff9900",
            "text": "Shiromani Akali Dal",
            "seat": 20
        }
    ];
    let arrayOfColor = showDetailsData.map((data, index) => {

        let ind = index < colorA.length ? index : 0;
            // console.log("index");
            // console.log(index);
            // let colorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

            return (
                {
                    "color": colorA[ind].color,
                    "text": data.groupName,
                    "seat": data.exitSeats ? data.exitSeats : data.totalSeats
                }
            )


        });



    // ];


    let countForColor = arrayOfColor.length > 0 ? 0 : -1;
    let countOfSeat = 0;
    if (countForColor >= 0) {
        countOfSeat = arrayOfColor[0].seat;
    }
    // console.log(countOfSeat);
    for (let k = 0; k < globalArray.length; k++) {


        if (countForColor >= 0) {
            // console.log("countOfSeat");
            // console.log(countOfSeat);
            // console.log(countForColor);

            showArray.push(<View style={{ ...globalArray[k], backgroundColor: arrayOfColor[countForColor].color }}></View>);

            if (countOfSeat < k) {
                countForColor = countForColor + 1;

                while (arrayOfColor.length > countForColor && arrayOfColor[countForColor].seat == 0) {

                    countForColor = countForColor + 1;
                }
                if (arrayOfColor.length > countForColor) {
                    countOfSeat = countOfSeat + arrayOfColor[countForColor].seat;

                } else {
                    countForColor = -1;
                }

            }

        } else {
            showArray.push(<View style={{ ...globalArray[k], backgroundColor: 'grey' }}></View>)
        }



    }

    let listArray = [];
    let supportDouble = arrayOfColor.length > 4;
    for (let k = 0; k < arrayOfColor.length; k = k + (supportDouble ? 2 : 1)) {
        let arr = [];
        arr.push(arrayOfColor[k]);
        if (supportDouble && k < arrayOfColor.length) {
            arr.push(arrayOfColor[k + 1]);
        }
        listArray.push(arr);
    }
    // console.log(showArray);
    return (
        <View style={{
            flex: 1, width: SCREEN_WIDTH
        }}>
            <View style={{ flex: 1 }}>
                <FlatList

                    data={listArray}
                    renderItem={({ item }) => {

                        let item1 = item[0];
                        let item2 = item.length >= 2 ? item[1] : null;
                        return (
                            <View style={{ flexDirection: 'row', margin: 1 }}>

                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>

                                        <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                                            <View style={{ backgroundColor: item1.color, justifyContent: "center", alignItems: "center", height: 20, width: 30 }}>
                                                <Text style={{ fontSize: 11, color: 'white' }}>{item1.seat}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 7, justifyContent: "center", padding: 4 }}>
                                            <Text style={{ fontSize: 11 }}>{item1.text}</Text>
                                        </View>
                                    </View>
                                </View>
                                {supportDouble && <View style={{ flex: 1 }}>
                                    {item2 &&
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                                            <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                                                <View style={{ backgroundColor: item2.color, justifyContent: "center", alignItems: "center", height: 20, width: 30 }}>
                                                    <Text style={{ fontSize: 11, color: 'white' }}>{item2.seat}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 7, justifyContent: "center", padding: 4 }}>
                                                <Text style={{ fontSize: 11 }}>{item2.text}</Text>
                                            </View>
                                        </View>
                                    }
                                </View>
                                }

                            </View>


                        )
                    }}
                />
            </View>
            <View style={{ height: props.Height / 2, justifyContent: 'flex-end' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
                    <Text style={{ fontSize: 11 }}>543</Text>
                    <Text style={{ fontSize: 10 }}>constituencies</Text>
                </View>
                {showArray}
            </View>


        </View>
    );


}