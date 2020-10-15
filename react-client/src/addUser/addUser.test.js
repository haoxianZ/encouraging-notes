import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddUser from './addUser'

describe(`sign up form component`, () => {
  it('renders the complete form', () => {
    const wrapper = shallow(<AddUser />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})