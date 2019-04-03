import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { normalize } from '../../../../Constant';
import Ionicons from 'react-native-vector-icons/Ionicons';

class SliderPoll extends Component {
    state = {
        percentage:
            [
                { answerId: 1, answerPercentage: 50 },
                { answerId: 2, answerPercentage: 30 },
                { answerId: 3, answerPercentage: 90 },
                { answerId: 4, answerPercentage: 70 },
                { answerId: 5, answerPercentage: 100 },
            ]
    }

    renderUserAnswer = (index, answerText) => {
        const { userAnswerId } = this.props;
        if (userAnswerId === index) {
            return (
                <View style={styles.iconContainer}>
                    <Text style={styles.answerText}> {answerText} </Text>
                    <Ionicons color="#000" style={styles.icon} name="ios-checkmark-circle-outline" size={18} />
                </View>
            )
        } else {
            return (
                <View style={styles.iconContainer}>
                    <Text style={styles.answerText}> {answerText} </Text>
                </View>
            )
        }
    }

    renderPercentage = () => {
        const { percentage } = this.state;
        const { surveyAnswerList } = this.props;
        let percent;
        if (surveyAnswerList.length > 0) {
            percent = surveyAnswerList.map((answer, index) => {
                return (
                    <View style={{ width: '100%' }} key={index + answer.answerId}>
                        {index === 0 ?
                            <View style={styles.pollContainer}>
                                <View style={{ width: '80%', position: 'relative' }}>
                                    <View style={[{ width: answer.answerPercentage + "%" }, styles.pollAnswer]}>
                                        {this.renderUserAnswer(index, "Strongly Disagree")}
                                    </View>
                                </View>
                                <View style={{ width: '20%', height: normalize(25) }}>
                                    <Text style={styles.percent}> {answer.answerPercentage + "%"} </Text>
                                </View>
                            </View> : null
                        }
                        {index === 1 ?
                            <View style={styles.pollContainer}>
                                <View style={{ width: '80%', position: 'relative' }}>
                                    <View style={[{ width: answer.answerPercentage + "%" }, styles.pollAnswer]}>
                                        {this.renderUserAnswer(index, "Disagree")}
                                    </View>
                                </View>
                                <View style={{ width: '20%', height: normalize(25) }}>
                                    <Text style={styles.percent}>  {answer.answerPercentage + "%"} </Text>
                                </View>
                            </View> : null
                        }
                        {index === 2 ?
                            <View style={styles.pollContainer}>
                                <View style={{ width: '80%', position: 'relative' }}>
                                    <View style={[{ width: answer.answerPercentage + "%" }, styles.pollAnswer]}>
                                        {this.renderUserAnswer(index, "Neutral")}
                                    </View>
                                </View>
                                <View style={{ width: '20%', height: normalize(25) }}>
                                    <Text style={styles.percent}>  {answer.answerPercentage + "%"} </Text>
                                </View>
                            </View> : null
                        }
                        {index === 3 ?
                            <View style={styles.pollContainer}>
                                <View style={{ width: '80%', position: 'relative' }}>
                                    <View style={[{ width: answer.answerPercentage + "%" }, styles.pollAnswer]}>
                                        {this.renderUserAnswer(index, "Agree")}
                                    </View>
                                </View>
                                <View style={{ width: '20%', height: normalize(25) }}>
                                    <Text style={styles.percent}>  {answer.answerPercentage + "%"} </Text>
                                </View>
                            </View> : null
                        }
                        {index === 4 ?
                            <View style={styles.pollContainer}>
                                <View style={{ width: '80%', position: 'relative' }}>
                                    <View style={[{ width: answer.answerPercentage + "%" }, styles.pollAnswer]}>
                                        {this.renderUserAnswer(index, "Strongly Agree")}
                                    </View>
                                </View>
                                <View style={{ width: '20%', height: normalize(25) }}>
                                    <Text style={styles.percent}>  {answer.answerPercentage + "%"} </Text>
                                </View>
                            </View> : null
                        }
                    </View>
                )
            })
        } else if (surveyAnswerList.length <= 0) {
            percent = percentage.map((answer, index) => {
                return (
                    <View style={{ width: '100%' }} key={index + answer.answerId}>
                        {index === 0 ?
                            <View style={styles.pollContainer}>
                                <View style={{ width: '80%', position: 'relative' }}>
                                    <View style={[{ width: answer.answerPercentage + "%" }, styles.pollAnswer]}>
                                        {this.renderUserAnswer(index, "Strongly Disagree")}
                                    </View>
                                </View>
                                <View style={{ width: '20%', height: normalize(25) }}>
                                    <Text style={styles.percent}> {answer.answerPercentage + "%"} </Text>
                                </View>
                            </View> : null
                        }
                        {index === 1 ?
                            <View style={styles.pollContainer}>
                                <View style={{ width: '80%', position: 'relative' }}>
                                    <View style={[{ width: answer.answerPercentage + "%" }, styles.pollAnswer]}>
                                        {this.renderUserAnswer(index, "Disagree")}
                                    </View>
                                </View>
                                <View style={{ width: '20%', height: normalize(25) }}>
                                    <Text style={styles.percent}>  {answer.answerPercentage + "%"} </Text>
                                </View>
                            </View> : null
                        }
                        {index === 2 ?
                            <View style={styles.pollContainer}>
                                <View style={{ width: '80%', position: 'relative' }}>
                                    <View style={[{ width: answer.answerPercentage + "%" }, styles.pollAnswer]}>
                                        {this.renderUserAnswer(index, "Neutral")}
                                    </View>
                                </View>
                                <View style={{ width: '20%', height: normalize(25) }}>
                                    <Text style={styles.percent}>  {answer.answerPercentage + "%"} </Text>
                                </View>
                            </View> : null
                        }
                        {index === 3 ?
                            <View style={styles.pollContainer}>
                                <View style={{ width: '80%', position: 'relative' }}>
                                    <View style={[{ width: answer.answerPercentage + "%" }, styles.pollAnswer]}>
                                        {this.renderUserAnswer(index, "Agree")}
                                    </View>
                                </View>
                                <View style={{ width: '20%', height: normalize(25) }}>
                                    <Text style={styles.percent}>  {answer.answerPercentage + "%"} </Text>
                                </View>
                            </View> : null
                        }
                        {index === 4 ?
                            <View style={styles.pollContainer}>
                                <View style={{ width: '80%', position: 'relative' }}>
                                    <View style={[{ width: answer.answerPercentage + "%" }, styles.pollAnswer]}>
                                        {this.renderUserAnswer(index, "Strongly Agree")}
                                    </View>
                                </View>
                                <View style={{ width: '20%', height: normalize(25) }}>
                                    <Text style={styles.percent}>  {answer.answerPercentage + "%"} </Text>
                                </View>
                            </View> : null
                        }
                    </View>
                )
            })


        }
        return percent;
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                {this.renderPercentage()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        marginVertical: normalize(5),
        marginTop: normalize(10),
        marginHorizontal: normalize(25)
    },

    pollContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: normalize(7),
        width: '100%',
    },

    pollAnswer: {
        flexDirection: 'row',
        display: 'flex',
        height: normalize(25),
        backgroundColor: 'rgba(87,48,134,.5)',
        marginRight: normalize(5),
        borderRadius: 5,
    },

    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        top: normalize(1),
        left: normalize(1)
    },

    icon: {
        marginTop: normalize(3),
        paddingLeft: normalize(-1),
    },

    answerText: {
        color: '#000',
        marginTop: normalize(4),
        paddingLeft: normalize(6),
        fontSize: 13
    },

    percent: {
        marginTop: normalize(7),
        fontSize: 13,
        textAlign: 'right'
    }
})

export default SliderPoll;