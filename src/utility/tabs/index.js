import React, { useState } from 'react';
import { AddButton } from './AddButton';
import { tabsLoop } from './tabsLoop';

export const BrowserTabs = ({ tabs, activeTab, closeTab, newTab }) => {
  const [currTabs, setNewTabs] = tabs;
  const [activeTabIndex, setActiveTabIndex] = activeTab;

  return (
    <div className="BrowserTabs">
      {/* Tabs */}
      {currTabs.length > 1 && (
        <div className={'tabs'}>
          {currTabs &&
            Array.isArray(currTabs) &&
            tabsLoop({
              currTabs,
              activeTabIndex,
              setActiveTabIndex,
              setNewTabs,
              closeTab,
            })}
          <AddButton onAddTabPress={newTab} />
        </div>
      )}
      {/* Body */}
      {currTabs.map((tabs, index) => (
        <div
          className={`BrowserTabs-content ${
            currTabs.length > 1 ? 'multi' : ''
          }`}
          style={{
            display: index != activeTabIndex && 'none',
          }}
        >
          {<tabs.content />}
        </div>
      ))}
    </div>
  );
};
