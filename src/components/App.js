import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TripList from './TripList';
import Trip from './Trip';

const initData = [
  {
    id: 1,
    title: '測試標題',
    trip: [
      {
        day: 1,
        detail: [
          { time: '上午', description: '早餐' },
          { time: '下午', description: '午餐' },
        ],
      },
      {
        day: 2,
        detail: [
          { time: '上午', description: '早餐' },
          { time: '下午', description: '午餐' },
        ],
      },
    ],
  },
];

export default function App() {
  const findTrip = id => initData.find(trip => trip.id === id);
  return (
    <Switch>
      <Route exact path="/" render={() => <TripList />} />
      <Route
        exact
        path="/trip/:id"
        render={routeProps => (
          <Trip trip={findTrip(routeProps.match.params.id)} />
        )}
      />
    </Switch>
  );
}
