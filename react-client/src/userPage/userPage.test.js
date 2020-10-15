import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import UserPage from './userPage'

describe(`AddNote component`, () => {

  it('renders the complete form', () => {
    const wrapper = shallow(<UserPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})
