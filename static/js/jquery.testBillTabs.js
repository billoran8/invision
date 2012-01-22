function testBillTabs() {

	test("BillTabManager created test", function() {
		equal(window.data.billTabsManager != null, true, "Tab manager created");
		equal(window.data.billTabsManager.tabs.length > 0, true, "At least one tab in activetabs");
		equal(window.data.billTabsManager.activeTab != null, true, "There is a tab selected by default");
		
		var tab1 = window.data.billTabsManager.tabs[1];
		var tab2 = window.data.billTabsManager.tabs[0];
		
		tab2.ui.tab.click();
		
		equal(tab1.isSelected == false, true, "tab1 is not selected");
		equal(tab1.ui.tab.hasClass('selected') == false, true, "tab1 does not have 'selected' class");
		equal(tab1.ui.content.is(':visible') == false, true, "tab1 content is invisible");
		
		equal(tab2.isSelected == true, true, "tab2 is selected");
		equal(tab2.ui.tab.hasClass('selected') == true, true, "tab2 has 'selected' class");
		equal(tab2.ui.content.is(':visible') == true, true, "tab2 content is visible");
		
		tab1.ui.tab.click();
		
		equal(tab2.isSelected == false, true, "tab2 is not selected");
		equal(tab2.ui.tab.hasClass('selected') == false, true, "tab2 does not have 'selected' class");
		equal(tab2.ui.content.is(':visible') == false, true, "tab2 content is invisible");
		
		equal(tab1.isSelected == true, true, "tab1 is selected");
		equal(tab1.ui.tab.hasClass('selected') == true, true, "tab1 has 'selected' class");
		equal(tab1.ui.content.is(':visible') == true, true, "tab1 content is visible");
		
	});
}