# :warning::warning: DEPRECATED :warning::warning:

This project, and it's related TestArmada projects, will no longer be supported. No further work from the owners will be done, and no PRs will be reviewed.

# magellan-nightwatch-plugin

A magellan plugin that connects [magellan](https://github.com/TestArmada/magellan) and [nightwatch](http://nightwatchjs.org/). 

**PLEASE NOTE: v6.0.0 would only be compatible with [Magellan](https://github.com/TestArmada/magellan) v10.0.0 and higher**

## Usage

 1. Add following code to your `package.json`. 

    ```
    "testarmada-magellan-nightwatch-plugin": "^5.0.0"
    ```

 2. Add following code to your `magellan.json` (optional)

    ```
    "framework": "testarmada-magellan-nightwatch-plugin"
    ```

Please notice that the step 2 is optional, magellan will try to load this plugin by default. It won't hurt if the plugin is out found. However, it is still recommended to add it to your `magellan.json`

## What does it do

This plugin connects magellan and nightwatch by

```
1. passing down magellan test filters (by tags, groups and/or tests) to nightwatch for test case selection.
2. modifying necessary ports so that magellan can run test in parallel (multi-worker) mode.
3. fixing some easy-to-forget configurations in `nightwatch.json` if there is any, to run test in parallel (multi-worker) mode.
4. passing down node env/configurations for child process spawn purpose.
```

## Update notes

### @8.0.0

Add `.js` config support. Right now you can name your nightwatch configuration file in both `.json` and `.js` format. Please note, to support `.js` format you also need `nightwatch-extra@5.1.0`

## License
Documentation in this project is licensed under Creative Commons Attribution 4.0 International License. Full details available at https://creativecommons.org/licenses/by/4.0
