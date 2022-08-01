import { Tab } from './tab'
export function tabsLoop({
    currTabs,
    activeTabIndex,
    setActiveTabIndex,
    setNewTabs,
    newTab,
    closeTab,
}) {
    return currTabs.map((tabs, index) => {
        const isLast = index == currTabs.length - 1
        return (
            <div key={'tabs' + index} className={`tab ${index === activeTabIndex ? "activeTab" : ""}`} >
                <Tab
                    closeTab={closeTab}
                    setActiveTabIndex={setActiveTabIndex}
                    index={index}
                    activeTabIndex={activeTabIndex}
                    tabs={tabs}
                    currTabs={currTabs}
                    setNewTabs={setNewTabs}
                    style={isLast ? { borderRadius: "0 5px 0 0" } : {} }
                />
                {activeTabIndex - 1 != index && activeTabIndex != index && !isLast && (
                    <div className='border'></div>
                )}
            </div>
        )
    })
}
