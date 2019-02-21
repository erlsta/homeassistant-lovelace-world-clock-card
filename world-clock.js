function addZero(i) {
	if (i < 10) { i = "0" + i; }
	return i;
}


class WorldClock extends HTMLElement {
	set hass(hass) {
		if (!this.content) {
			const card = document.createElement('ha-card');
			this.content = document.createElement('div');
			this.content.style.padding = '5px';
			card.appendChild(this.content);
			this.appendChild(card);
		}
 		
 		var wcName = this.config.title;
 		var wcTimeZone = this.config.tz;
		var wcSeparator = (this.config.separator) ? this.config.separator : "."; // Default .
 		var wcMode = this.config.mode;
 		var wcDSTsymbol = "";
 		var wcAMPM = "";
		
		var wcDay = new Date();
		
		if (!wcTimeZone) {
			
			// Lokal tidssone
			var wcHour = wcDay.getHours();
			var wcMinute = wcDay.getMinutes();
			
		} else if (wcTimeZone == "UTC") {
			
			// UTC
			var wcHour = wcDay.getUTCHours();
			var wcMinute = wcDay.getUTCMinutes();
			
		} else {
			
			// Annen tidssone
 			if ( this.config.daylight_saving_time ) {
 				var wcDST = (60 * 60 * 1000);
 				var wcDSTsymbol = "<span style='font-size: 9pt; vertical-align: text-top;'> &#8225;</span>";
 			} else {
 				var wcDST = 0;
 			}
 			
	 		var wcTimeZoneVal = (wcTimeZone.substr(0,1) == "+") ? 1 : 0; // 0=minus, 1=plus
 			var wcTimeZoneHours = parseInt( wcTimeZone.substr(1,2) );
 			var wcTimeZoneMinutes = parseInt( wcTimeZone.substr(4,2) );
			
			var wcTime = wcDay.getTime();
			var wcTimeOffset = ( wcDay.getTimezoneOffset() * 60 * 1000 );
			var wcUTC = wcTimeZoneVal ? ( wcTime + (wcTimeZoneHours * 60 * 60 * 1000) + (wcTimeZoneMinutes * 60 * 1000) + wcTimeOffset + wcDST ) : ( wcTime - (wcTimeZoneHours * 60 * 60 * 1000) - (wcTimeZoneMinutes * 60 * 1000) + wcTimeOffset + wcDST );
			var wcDayAdjusted = new Date(wcUTC);
			
			var wcHour = wcDayAdjusted.getHours();
			var wcMinute = wcDayAdjusted.getMinutes();
			
		}
		
		if ( wcMode == "12h" ) {
			
			if ( (wcHour > 12) || ( (wcHour == 12) && (wcMinute > 0) ) ) {
				wcHour = wcHour - 12;
				wcAMPM = "<span style='font-size: 9pt;'> PM</span>";
			} else {
				wcAMPM = "<span style='font-size: 9pt;'> AM</span>";
			}
			
			var wcTimeStr = wcHour + wcSeparator + addZero(wcMinute);
			
		} else {
			
			var wcTimeStr = addZero(wcHour) + wcSeparator + addZero(wcMinute);
			
		}
		
		
		var cardHtmlStyle = `
		<style>
			.wc-wrapper {
				text-align: center;
				padding: 5px 0 5px 0;
			}
			.wc-name {
				font-weight: bold;
				color: var(--paper-item-icon-color);
				padding-bottom: 3px;
			}
			.wc-time {
				font-size: 16pt;
			}
		</style>
		`;
		
		var cardHtmlContent = "<div class='wc-wrapper'> <div class='wc-name'>" + wcName + "</div> <div class='wc-time'>" + wcTimeStr + wcAMPM + wcDSTsymbol + "</div> </div>";
		
		this.content.innerHTML = cardHtmlStyle + cardHtmlContent;
		
	}
	
	
	
	setConfig(config) {
		this.config = config;
	}
	
	// The height of your card. Home Assistant uses this to automatically
	// distribute all cards over the available columns.
	getCardSize() {
		return 3;
	}
}

customElements.define('world-clock', WorldClock);
