import React from 'react';

import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  number,
} from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import backgroundColor from 'react-storybook-decorator-background';

import { UserTag } from '../app/components/UserTag';
import { WageRecapLine } from '../app/components/WageRecapLine';

import '../app/styles/theme.scss';


const sharedComponentStories = storiesOf('Shared components', module);
sharedComponentStories.addDecorator(withKnobs);
sharedComponentStories.addDecorator(backgroundColor(['#ffffff', '#34495e', '#8e44ad', '#e74c3c', '#27ae60']));

sharedComponentStories.add(
  'UserTag',
  () => (
    <div style={{ display: 'flex' }}>
      <UserTag
        name={text('Nom', 'Nicolas')}
        avatarUrl={text('Avatar url', 'https://ui-avatars.com/api/?name=Adolf%20&color=0000&background=CCC')}
      />
    </div>
  ),
);

sharedComponentStories.add(
  'WageRecapLine',
  () => (
    <div style={{ display: 'flex', width: '320px' }}>
      <WageRecapLine
        firstname={text('Prénom', 'Nicolas')}
        wage={number('Paie', 159.99)}
        onClick={action('onClick')}
      />
    </div>
  ),
);
