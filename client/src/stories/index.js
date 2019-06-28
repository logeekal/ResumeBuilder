import React from 'react';
import { FloatingMenu } from '../components/FloatingMenu';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';


storiesOf('Button', module)
  .add('with text', () => (
    <Button>Hello Button</Button>
  ))
  .add('with emoji', () => (
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ));   


storiesOf('FloatingMenu', module)
    .add('Button', ()=>{
        return <FloatingMenu/>
    })

