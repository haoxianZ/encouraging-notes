import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Note from './userNote'

describe(`Note component`, () => {

  it('renders a .Note by default', () => {
    const wrapper = shallow(<Note />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  
})
