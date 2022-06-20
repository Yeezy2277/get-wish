import React from 'react';
import PostsActionsheet from '../../components/Posts/PostsActionsheet';
import AddPostFirstStep from '../../components/Posts/AddPostFirstStep';
import AddPostSecondStep from '../../components/Posts/AddPostSecondStep';

export const AddPostContext = React.createContext(undefined);

function AddPost({ navigation, ...props }) {
  const id = React.useMemo(() => props?.route?.params?.id, [props?.route?.params?.id]);
  const StepsComponents = {
    0: AddPostFirstStep,
    1: AddPostSecondStep,
  };
  const [step, setStep] = React.useState(id ? 1 : 0);
  const Step = StepsComponents[step];
  const parent = navigation.getParent();
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    parent.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      parent.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [navigation]);

  console.log('id', id)
  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const onPrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const [checkedItems, setCheckedItems] = React.useState([]);

  return (
    <AddPostContext.Provider value={{
      checkedItems, setCheckedItems, navigation, onNextStep, onPrevStep, step, id
    }}
    >
      <Step />
      <PostsActionsheet setOpen={setOpen} open={open} />
    </AddPostContext.Provider>
  );
}

export default AddPost;
