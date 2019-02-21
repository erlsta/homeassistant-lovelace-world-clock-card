# homeassistant-lovelace-world-clock-card
Custom card to display one or more world clocks in Lovelace. In the example below, several instances of world-clock are arranged with `horizontal-stack`.

![Image of world-clock-card](https://github.com/erlsta/homeassistant-lovelace-world-clock-card/blob/master/world-clock.png)

## Version history
v1.0  (2019.02.21) First version

**Remember to increment the version number every time you update world clock to a new version (V=1.002, 1.003, etc.).**
After incrementing the version number, reload the page where you display your Home Assistant page (usually by holding down command/control and reloading the page - might differ from browser to browser).

## How to install
1. Copy the script (world-clock.js) to your local directory (I suggest to place all plugins in a directory "plugins" inside your www-folder - if not: adjust the path to world-clock.js). The file world-clock.png is not necessary - it's just there so I can display the picture of the card above.
2. Add this to your ui-lovelace.yaml:

```
resources:
  - url: /local/plugins/world-clock.js?v=1.001
    type: js
```

Place the card in your ui-lovelace.yaml like this:

```
views:
  - title: "Example"
    cards:
      - type: "custom:world-clock"
        title: "Portugal"
        tz: "-01:00"
        mode: "12h"
        daylight_saving_time: true
        separator: ":"
```

(or add it as a card to an existing view)

### Options
`title` (requiered) The name that will be displayed above the time.

`tz` (optional) Time zone - must be written in the format "+xx:xx" / "-xx:xx" where all x'es are numbers OR "UTC" for UTC/GMT (defaults to local time if no time zone is given).

`mode` (optional) If set to "12h" the time will be displayed in 12 hour mode (defaults to 24 hour).

`daylight_saving_time` (optional) true OR false (dafaults to false).

`separator` (optional) Set another separator to be displayed between hours and minutes (defaults to a point ".").
