
# Meteor import issue related to local npm packages

### Attempt 1

Installing a package like so...

```bash
# Install thingie from the monorepo's packages dir
cd app
meteor npm install ../packages/thingie
# Enable recompiling by Meteor
mkdir imports
cd imports
ln -s ../../packages/thingie .
```

...and trying to import a file from it like so ... (we have a build plugin for .ftl files installed!)

```
import bundle from 'thingie/messages.ftl';
```

**-> Breaks.**

### Attempt 2

However, if we change the import statement to point to the `imports` folder instead...

```
import bundle from '../imports/thingie/messages.ftl';
```

**-> Works.**

### Attempt 3

If I use `yalc` to link to the package like so:

```bash
# Install yalc
npm install -g yalc
# Publish package to yalc
cd packages/thingie
yalc publish
# Add published package to app
cd ../../app
yalc add thingie
meteor npm install
```

...and import it like we did at _Attempt #1_:

```
import bundle from 'thingie/messages.ftl';
```

**-> It works!**


