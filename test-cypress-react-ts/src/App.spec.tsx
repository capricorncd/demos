/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/22 20:05:50 (GMT+0900)
 */
import React from 'react'
import { mount } from '@cypress/react'
import App from './App'

it('button', () => {
  mount(<App />)
  cy.get('button').click()
  cy.get('button').contains('count is: 1')
})
