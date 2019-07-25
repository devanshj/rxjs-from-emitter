read -p "you sure? (y/*) " shouldContinue
if [ "$shouldContinue" != "y" ]; then
	exit
fi

tsc --noEmitOnError
if [ "$?" != "0" ]; then
	echo "tsc exited with non-zero code"
	exit
fi

cp -r dist/package/ distribution/
cp LICENSE distribution/LICENSE
cp README.md distribution/README.md
cp package.json distribution/package.json