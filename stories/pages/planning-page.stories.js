import React from 'react';

import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
} from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import MealsSelector from '../../app/containers/Tabs/PlanningTab/components/MealsSelector';
import { Card } from '../../app/components/UiKit';
import {
  DistanceInput,
  RemovableTimeRangePicker,
} from '../../app/containers/Tabs/PlanningTab/ClockInPage/components';

const clockInPageStories = storiesOf('Clock-in page');
clockInPageStories.addDecorator(withKnobs);

const suppliers = [
  'Parents',
  'Nounou'
];

const meals = [
  {
    id: 'biberon',
    icon: 'biberon',
    supplier: 'Parents'
  },
  {
    id: 'lunch',
    icon: 'lunch',
    supplier: 'Nounou',
    price: 2.6
  },
  {
    id: 'brunch',
    icon: 'brunch',
    supplier: 'Nounou',
    price: 1
  },
  {
    id: 'dinner',
    icon: 'dinner'
  },
];

clockInPageStories.add('MealsSelector', () => (
  <Card
    title="Repas"
    subtitle="fournis par :"
  >
    <MealsSelector
      suppliers={suppliers}
      meals={meals}
      onMealChanged={action('changed')}
    />
  </Card>
));

clockInPageStories.add('DistanceInput', () => (
  <DistanceInput
    distance={text('Distance', '5')}
    onDistanceChange={action('onDistanceChange')}
    onFocusOut={action('onFocusOut')}
  />
));

const timeSamples = ['08:15', '12:00', '14:30', '18:00'];
const timeRange = {
  begin: {
    time: timeSamples[0],
    invalidated: false,
  },
  end: {
    time: timeSamples[1],
    invalidated: true,
    invalidatedLabel: 'Prévu : 18h00'
  },
};
clockInPageStories.add(
  'RemovableTimeRangePicker',
  () => (
    <div style={{ display: 'flex' }}>
      <RemovableTimeRangePicker
        timeRange={timeRange}
        onDisableClick={action('onDisableClick')}
      />
    </div>
  )
);
