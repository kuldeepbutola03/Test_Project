import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const heatMap = props => {
  let points = [
    {latitude: 49.986111, longitude: 20.061667, weight: 100},
    {latitude: 50.193139, longitude: 20.288717, weight: 100},
    {latitude: 49.740278, longitude: 19.588611, weight: 100},
    {latitude: 50.061389, longitude: 19.938333, weight: 100},
    {latitude: 50.174722, longitude: 20.986389, weight: 100},
    {latitude: 50.064507, longitude: 19.920777, weight: 100},
    {latitude: 49.3, longitude: 19.95, weight: 100},
    {latitude: 49.833333, longitude: 19.940556, weight: 100},
    {latitude: 49.477778, longitude: 20.03, weight: 100},
    {latitude: 49.975, longitude: 19.828333, weight: 100},
    {latitude: 50.357778, longitude: 20.0325, weight: 100},
    {latitude: 50.0125, longitude: 20.988333, weight: 100},
    {latitude: 50.067959, longitude: 19.91266, weight: 100},
    {latitude: 49.418588, longitude: 20.323788, weight: 100},
    {latitude: 49.62113, longitude: 20.710777, weight: 100},
    {latitude: 50.039167, longitude: 19.220833, weight: 100},
    {latitude: 49.970495, longitude: 19.837214, weight: 100},
    {latitude: 49.701667, longitude: 20.425556, weight: 100},
    {latitude: 50.078429, longitude: 20.050861, weight: 100},
    {latitude: 49.895, longitude: 21.054167, weight: 100},
    {latitude: 50.27722, longitude: 19.569658, weight: 100},
    {latitude: 49.968889, longitude: 20.606389, weight: 100},
    {latitude: 49.51232, longitude: 19.63755, weight: 100},
    {latitude: 50.018077, longitude: 20.989849, weight: 100},
    {latitude: 50.081698, longitude: 19.895629, weight: 100},
    {latitude: 49.968889, longitude: 20.43, weight: 100},
    {latitude: 50.279167, longitude: 19.559722, weight: 100},
    {latitude: 50.067947, longitude: 19.912865, weight: 100},
    {latitude: 49.654444, longitude: 21.159167, weight: 100},
    {latitude: 50.099606, longitude: 20.016707, weight: 100},
    {latitude: 50.357778, longitude: 20.0325, weight: 100},
    {latitude: 49.296628, longitude: 19.959694, weight: 100},
    {latitude: 50.019014, longitude: 21.002474, weight: 100},
    {latitude: 50.056829, longitude: 19.926414, weight: 100},
    {latitude: 49.616667, longitude: 20.7, weight: 100},
    {latitude: 49.883333, longitude: 19.5, weight: 100},
    {latitude: 50.054217, longitude: 19.943289, weight: 100},
    {latitude: 50.133333, longitude: 19.4, weight: 100},
  ];

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      scrollEnabled = {true}
      style={{height: '100%', width: '100%'}}
      region={{
        latitude: 49.0990,
        longitude: 19.7129,
        latitudeDelta: 5,
        longitudeDelta: 5,
      }}
      zoomEnabled = {false}
    >

       <MapView.Heatmap
        points={points}
        radius = {50}
        // opacity={1}

        // onZoomRadiusChange={{
        //   zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        //   radius: [
        //     10,
        //     10,
        //     15,
        //     20,
        //     30,
        //     60,
        //     80,
        //     100,
        //     120,
        //     150,
        //     180,
        //     200,
        //     250,
        //     250,
        //   ],
        // }
      // }
        gradient={{
          colors: ['#79BC6A', '#BBCF4C', '#EEC20B', '#F29305', '#E50000'],
          values: [0, 0.25, 0.50, 0.75, 1],
        }}
        maxIntensity={100}
        gradientSmoothing={10}
        heatmapMode={'POINTS_WEIGHT'}
      />
    </MapView>
  );
};


export default heatMap;
