import * as chai from 'chai';
import * as sinon from 'sinon';
import sinon_chai from 'sinon-chai';

const { expect } = chai;
const { assert } = chai;

chai.should();
chai.use(sinon_chai);

export { sinon, expect, assert };
