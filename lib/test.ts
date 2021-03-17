import { cognito } from './index';
import { UsernameParams } from './cognito/types';

const test = async () => {
  const params: UsernameParams = {
    UserPoolId: 'us-east-1_HLDn4Lvh4',
    Username: 'cloudcar-admin',
  };

  const result = await cognito.disableUser(params);
  console.log(result);
};

test();
