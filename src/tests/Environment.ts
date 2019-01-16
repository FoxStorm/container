import { expect } from 'chai'
import { Environment } from '../Environment'

it('returns an instance of production Environment', () => {
  const productionEnvironment = Environment.production()
  expect(productionEnvironment.name).to.be.eq('production')
})

it('returns an instance of development Environment', () => {
  const developmentEnvironment = Environment.development()
  expect(developmentEnvironment.name).to.be.eq('development')
})

it('returns an instance of testing Environment', () => {
  const testingEnvironment = Environment.testing()
  expect(testingEnvironment.name).to.be.eq('testing')
})
