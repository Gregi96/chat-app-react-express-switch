const initialState = [
  {
    id: 1,
    name: 'John Doe',
    isActive: true,
    avatar_url: 'https://i.pravatar.cc/150?img=68'
  },
  {
    id: 2,
    name: 'Krystian Pach',
    isActive: false,
    avatar_url: 'https://i.pravatar.cc/150?img=69'
  }
];

export const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case 'SWITCH_USER':
      return state.map((user) => {
        return { ...user, isActive: !user.isActive };
      });
    default:
      return state;
  }
};
