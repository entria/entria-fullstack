source "https://rubygems.org"

gem "fastlane"
# Added at 2018-04-04 13:00:07 -0300 by jcm:
gem "semantic", "~> 1.6"

gem "cocoapods"
gem "cocoapods-fix-react-native"

gem 'prettier'

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)
