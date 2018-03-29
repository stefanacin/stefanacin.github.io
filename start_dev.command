# Change into current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR;

# Run VS Code on project
code .;

# Generate the jekyll site and visualize it
bundle exec jekyll serve;
