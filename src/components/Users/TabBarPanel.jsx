import React from 'react';
import { TabBarPanelContainer, TabBarPanelImage } from '../../styles/shared';

function TabBarPanel({
  active, jumpTo, index, image, imageActive
}) {
  const goTo = () => {
    jumpTo(index);
  };
  return (
    <TabBarPanelContainer
      onPress={goTo}
      active={active}
    >
      <TabBarPanelImage source={active ? imageActive : image} />
    </TabBarPanelContainer>
  );
}

export default TabBarPanel;
