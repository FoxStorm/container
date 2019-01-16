import { expect } from 'chai'
import { Config } from '../Config'

it('returns an instance of Config', () => {
  const config = new Config()
  expect(config).to.be.instanceOf(Config)
})
