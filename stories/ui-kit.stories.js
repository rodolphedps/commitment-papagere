import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  selectV2,
  text,
  number,
  color,
} from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import backgroundColor from 'react-storybook-decorator-background';

import { COLORS } from 'constants/colors.js';
import fontIcons from '../app/fonts/papagere-icons.json';
import {
  Toggle,
  IconSelect,
  Card,
  RoundedButton,
  TextInput,
  TextArea,
  TimePicker,
  TimeRangePicker,
  DisableableTimeRangePicker,
  Icon,
  NumberInput,
  Button,
  ListCard,
  CalendarRow,
  ContextualButton,
  ContextualButtonItem,
  LabelledInput,
  DateTimePicker,
  Select,
  Badge,
  TitledCard,
} from '../app/components/UiKit';
import { parse, startOfDay, addDays, addHours } from '../app/utils/date';

import papagereAvatar from '../app/images/login/papagere-avatar.png';

import '../app/styles/theme.scss';


const uiKitStories = storiesOf('UI Kit', module);
uiKitStories.addDecorator(withKnobs);
uiKitStories.addDecorator(backgroundColor(['#ffffff', '#34495e', '#8e44ad', '#e74c3c', '#27ae60']));

uiKitStories.add('Icons', () => {
  const icons = Object.keys(fontIcons);
  return (
    <div className="col">
      <div className="row">
        {
          icons.map((iconName) => (
            <span key={iconName} className="col-lg-2 col-md-4 col-sm-6" style={{ marginTop: 10 }}>
              <span className="d-flex flex-column align-items-center">
                <div style={{ fontSize: 30 }} key={iconName} className={`icon icon-${iconName}`}></div>
                <div>icon-{iconName}</div>
              </span>
            </span>
          ))
        }
      </div>
    </div>
  );
});

uiKitStories.add('Icon', () => (
  <div className="d-flex justify-content-center align-items-center">
    <Icon name={selectV2('className', Object.keys(fontIcons), Object.keys(fontIcons)[0])} style={{ fontSize: number('fontSize', 150), color: color('color', '#34495e') }} />
  </div>
));

uiKitStories.add('IconSelect', () => (
  <IconSelect
    iconName={selectV2('iconName', Object.keys(fontIcons), Object.keys(fontIcons)[0])}
    checked={boolean('checked', false)}
    onClick={action('clicked')}
  />
));

uiKitStories.add('RoundedButton', () => (
  <RoundedButton
    iconName={selectV2('iconName', Object.keys(fontIcons), Object.keys(fontIcons)[0])}
    onClick={action('clicked')}
  />
));

uiKitStories.add('Toggle', () => (
  <Toggle checked={boolean('Checked', true)} />
));

uiKitStories.add('Card', () => (
  <Card
    title="Présence"
  >
    Hello ceci est un texte lambda
  </Card>
));

uiKitStories.add('Card with deactivated state', () => (
  <Card
    title="Trajets"
    iconStyle={{ color: '#A8AAB7' }}
    oneRow
  >
    Hello ceci est un texte lambda
  </Card>
));

uiKitStories.add('TextInput', () => (
  <TextInput
    value={text('Value', 'Hello!')}
    placeholder={text('Placeholder', 'Write me!')}
    onChange={action('onChange')}
    onBlur={action('onBlur')}
  />
));

uiKitStories.add('TextArea', () => (
  <TextArea
    value={text('Value', 'Hello!')}
    placeholder={text('Placeholder', 'Write me!')}
    readOnly={boolean('Read only', false)}
    onChange={action('onChange')}
  />
));

const timeSamples = ['08:15', '12:00', '14:30', '18:00'];
const stepSamples = [1, 5]; // 1 et 5 minutes

uiKitStories.add('TimePicker', () => (
  <TimePicker
    time={selectV2('Time', timeSamples, timeSamples[0])}
    step={selectV2('Step', stepSamples, stepSamples[0])}
    invalidated={boolean('Invalidated', false)}
    disabled={boolean('Disabled', false)}
    onTimeChange={action('onTimeChange)')}
    onFocusOut={action('onFocusOut')}
  />
));

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
uiKitStories.add('TimeRangePicker', () => (
  <TimeRangePicker
    timeRange={timeRange}
    step={stepSamples[0]}
    onRangeChange={action('onRangeChange')}
    disabled={boolean('Disabled', false)}
  />
));

uiKitStories.add('DisableableTimeRangePicker', () => (
  <DisableableTimeRangePicker
    timeRange={timeRange}
    disabled={boolean('Disabled', false)}
    onDisableClick={action('onDisableClick')}
  />
));

const numberInputStepSamples = [1, 5, 10];
uiKitStories.add('NumberInput', () => (
  <NumberInput
    value={text('Value', '3')}
    step={selectV2('Step', numberInputStepSamples, numberInputStepSamples[0])}
    disabled={boolean('Disabled', false)}
    onChange={action('onChange')}
    onFocusOut={action('onFocusOut')}
  />
));

const iconKeys = ['', ...Object.keys(fontIcons)];
uiKitStories.add('Button', () => (
  <Button
    text={text('Text', 'Click me!')}
    icon={selectV2('iconName', iconKeys, iconKeys[0])}
    onClick={action('onClick')}
  />
));

uiKitStories.add(
  'ListCard',
  () => (
    <div style={{ display: 'flex' }}>
      <ListCard
        theme={selectV2('Theme', Object.values(ListCard.THEMES), ListCard.THEMES.STANDARD)}
      >
        <div
          style={{
            height: '100px',
            width: '200px',
            fontSize: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Fake content
        </div>
      </ListCard>
    </div>
  )
);

uiKitStories.add(
  'CalendarRow',
  () => (
    <div style={{ display: 'flex' }}>
      <CalendarRow date={parse('2018-09-23', 'yyyy-MM-dd')}>
        <ListCard
          theme={selectV2('Theme', Object.values(ListCard.THEMES), ListCard.THEMES.STANDARD)}
        >
          <div
            style={{
              height: '56px',
              width: '200px',
              fontSize: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Fake content
          </div>
        </ListCard>
      </CalendarRow>
    </div>
  ),
);


uiKitStories.add(
  'ContextualButton',
  () => (
    <div style={{ display: 'flex' }}>
      <ContextualButton
        title={text('Title', 'Planning')}
      >
        <ContextualButtonItem
          label="test"
          imgSrc={papagereAvatar}
          onClick={action('onClick')}
        />
      </ContextualButton>
    </div>
  ),
);

uiKitStories.add(
  'LabelledInput',
  () => (
    <div style={{ display: 'flex', width: '500px' }}>
      <LabelledInput
        label={text('Label', 'Journée entière')}
      >
        <Toggle checked />
      </LabelledInput>
    </div>
  ),
);

const dateTimeSamples = [
  startOfDay(new Date()),
  addHours(addDays(startOfDay(new Date()), 1), 12),
];

uiKitStories.add(
  'DateTimePicker',
  () => (
    <div style={{ display: 'flex' }}>
      <DateTimePicker
        dateTime={selectV2('Time', dateTimeSamples, dateTimeSamples[0])}
        step={selectV2('Step', stepSamples, stepSamples[0])}
        onChange={action('onChange')}
      />
    </div>
  ),
);

uiKitStories.add(
  'Select',
  () => (
    <div style={{ display: 'flex' }}>
      <Select
        value={selectV2('value', ['', 1, 2, 3], 1)}
        onChange={action('onChange')}
        placeholder={text('placeholder', '')}
      >
        <option value={1}>Option 1</option>
        <option value={2}>Option 2</option>
        <option value={3}>Option 3</option>
      </Select>
    </div>
  ),
);

uiKitStories.add(
  'TitledCard',
  () => (
    <div style={{ display: 'flex' }}>
      <TitledCard title="My title">
        <div>Card content goes here</div>
      </TitledCard>
    </div>
  ),
);

const colorsSample = [
  COLORS.BLUE,
  COLORS.GREEN1,
  COLORS.RED1,
];
uiKitStories.add(
  'Badge',
  () => (
    <div style={{ display: 'flex' }}>
      <Badge
        text={text('text', 'Hello!')}
        color={selectV2('color', colorsSample, colorsSample[0])}
      />
    </div>
  )
);
