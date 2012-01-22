function BillTabsManager(container) {
	this.ui = {};
	this.ui.container = container;
	
	this.tabs = new Array();
	this.activeTab = null;	
	this.onTabsChangedEvent = null;
	
	$(this).bind('tabsChanged', this, function(event, newTab, oldTab){
		var billTabsManager = event.data;
	
		if (billTabsManager.onTabsChangedEvent != null) {
			billTabsManager.onTabsChangedEvent(newTab, oldTab);
		}
	});
	
	this.init();
	
	return this;
}

BillTabsManager.prototype.onTabsChanged = function(callback) {
	this.onTabsChangedEvent = callback;
}

BillTabsManager.prototype.log = function(string) {
	console.log('BILLTABS LOG : ' + string);
	
	return this;
}

BillTabsManager.prototype.init = function() {

	this.log('BILLTABS INITIATING');

	var billTabsManager = this;

	this.ui.container.children().each(function() {
		if ($(this).attr('billTab') != null) {
			billTabsManager.addTab($(this));
		} else {
			billTabsManager.log('CANNOT FIND BILLTAB ATTRIBUTE ON OBJECT ' + $(this).html());
		}
	});
	
	if (this.tabs.length < 1) {
		this.log('ERROR : NO TABS ADDED');
	} else if (this.activeTab == null) {
		this.tabs[0].select();
	}
	
	return this;
}

BillTabsManager.prototype.addTab = function($tab) {
	this.log('adding ' + $tab.html());
	
	if ($('#' + $tab.attr('billTab')).length > 0) {	
		this.tabs.push(new BillTab($tab, $('#' + $tab.attr('billTab')), $tab.hasClass('selected'), this)); 	
	} else {
		billTabsManager.log('CANNOT FIND CORRESPONDING TAB FOR ' + $tab.html());
	}
}

function BillTab(tab, content, isSelected, tabManager) {
	this.ui = {};
	
	this.ui.tab = tab;
	this.ui.content = content;
	
	this.isSelected = isSelected;
	this.tabManager = tabManager;
	
	var billTab = this;
	
	this.ui.tab.click(function() {	
		billTab.select();
	});
	
	if (isSelected == true) {
		this.select();
	} else {
		this.deselect();
	}
	
	return this;
}

BillTab.prototype.select = function() {

	if (this.tabManager.activeTab != null) {
		$(this.tabManager).trigger('tabsChanged', [this, this.tabManager.activeTab]);
		this.tabManager.activeTab.deselect();
	}

	this.ui.tab.addClass('selected');
	this.ui.content.show();
	
	this.tabManager.activeTab = this;
	this.isSelected = true;
	
	return this;
}

BillTab.prototype.deselect = function() {
	this.ui.tab.removeClass('selected');
	this.ui.content.hide();
	
	this.isSelected = false;
	
	return this;
}