export type UserInfoType = {
  userInfo: {
    _id: string;
    status: string;
    accessToken: string;
    user: {
      userName: string;
      password: string;
      email: string;
    };
  };
};
