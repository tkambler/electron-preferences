'use strict';

// Const electron = require('electron');
// const app = electron.app;
const path = require('path');
const os = require('os');
const ElectronPreferences = require('../');

const preferences = new ElectronPreferences({
	css: 'custom-style.css',
	dataStore: path.resolve(__dirname, 'preferences.json'),
	defaults: {
		notes: {
			folder: path.resolve(os.homedir(), 'Notes'),
		},
		about: {
			firstName: 'Pieter-Jan',
			lastName: 'Van Robays',
		},
		// ...
	},
	webPreferences: {
		devTools: true,
	},
	browserWindowOverrides: {
		title: 'My Electron Preferences',
	},
	sections: [
		{
			id: 'about',
			label: 'About You',
			icon: 'single-01',
			form: {
				groups: [
					{
						label: 'About You',
						fields: [
							{
								label: 'First Name',
								key: 'firstName',
								type: 'text',
								help: 'What is your first name?',
							},
							{
								label: 'Last Name',
								key: 'lastName',
								type: 'text',
								help: 'What is your last name?',
							},
							{
								label: 'Gender',
								key: 'gender',
								type: 'dropdown',
								options: [
									{ label: 'Male', value: 'male' },
									{ label: 'Female', value: 'female' },
									{ label: 'Unspecified', value: 'unspecified' },
								],
								help: 'What is your gender?',
							},
							{
								label: 'Age',
								key: 'age',
								type: 'text',
								inputType: 'number',
							},
							{
								label: 'Which of the following foods do you like?',
								key: 'foods',
								type: 'checkbox',
								options: [
									{ label: 'Ice Cream', value: 'iceCream' },
									{ label: 'Carrots', value: 'carrots' },
									{ label: 'Cake', value: 'cake' },
									{ label: 'Spinach', value: 'spinach' },
								],
								help: 'Select one or more foods that you like.',
							},
							{
								label: 'Are you tired?',
								key: 'tired',
								type: 'checkbox',
								options: [
									{ label: 'Yes', value: 'yes' },
								],
							},
							{
								label: 'Coolness',
								key: 'coolness',
								type: 'slider',
								min: 0,
								max: 9001,
							},
							{
								label: 'Eye Color',
								key: 'eyeColor',
								type: 'color',
								format: 'hex',
								help: 'Your eye color',
							},
							{
								label: 'Hair Color',
								key: 'hairColor',
								type: 'color',
								format: 'rgb',
								help: 'Your hair color',
							},
						],
					},
				],
			},
		},
		{
			id: 'notes',
			label: 'Notes',
			icon: 'folder-15',
			form: {
				groups: [
					{
						label: 'Stuff',
						fields: [
							{
								label: 'Read notes from folder',
								key: 'folder',
								type: 'directory',
								help: 'The location where your notes will be stored.',
								multiSelections: false,
								noResolveAliases: false,
								treatPackageAsDirectory: false,
								dontAddToRecent: true,
							},
							{
								label: 'Select some images',
								key: 'images',
								type: 'file',
								help: 'List of selected images',
								filters: [
									{ name: 'Joint Photographic Experts Group (JPG)', extensions: [ 'jpg', 'jpeg', 'jpe', 'jfif', 'jfi', 'jif' ] },
									{ name: 'Portable Network Graphics (PNG)', extensions: [ 'png' ] },
									{ name: 'Graphics Interchange Format (GIF)', extensions: [ 'gif' ] },
									{ name: 'All Images', extensions: [ 'jpg', 'jpeg', 'jpe', 'jfif', 'jfi', 'jif', 'png', 'gif' ] },
									// { name: 'All Files', extensions: ['*'] }
								],
								multiSelections: true,
								showHiddenFiles: true,
								noResolveAliases: false,
								treatPackageAsDirectory: false,
								dontAddToRecent: true,
							},
							{
								heading: 'Important Message',
								content: '<p>The quick brown fox jumps over the long white fence. The quick brown fox jumps over the long white fence. The quick brown fox jumps over the long white fence. The quick brown fox jumps over the long white fence.</p>',
								type: 'message',
							},
						],
					},
				],
			},
		},
		{
			id: 'space',
			label: 'Other Settings',
			icon: 'spaceship',
			form: {
				groups: [
					{
						fields: [
							{
								label: 'Phone Number',
								key: 'phoneNumber',
								type: 'text',
								help: 'What is your phone number?',
							},
							{
								label: 'Foo or Bar?',
								key: 'foobar',
								type: 'radio',
								options: [
									{ label: 'Foo', value: 'foo' },
									{ label: 'Bar', value: 'bar' },
									{ label: 'FooBar', value: 'foobar' },
								],
								help: 'Foo? Bar?',
							},
							{
								label: 'Bar or Foo?',
								key: 'barfoo',
								type: 'radio',
								options: [
									{ label: 'Bar', value: 'bar' },
									{ label: 'Foo', value: 'foo' },
									{ label: 'BarFoo', value: 'barfoo' },
								],
								help: 'Bar? Foo?',
							},
							{
								label: 'Shortcut',
								key: 'shortcut',
								type: 'accelerator',
								help: 'A keyboard shortcut',
								modifierRequired: true,
							},
						],
					},
				],
			},
		},
		{
			id: 'lists',
			label: 'Lists',
			icon: 'notes',
			form: {
				groups: [
					{
						label: 'Lists',
						fields: [
							{
								label: 'Favorite foods',
								key: 'foods',
								type: 'list',
								size: 15,
								help: 'A list of your favorite foods',
								addItemValidator: /^[A-Za-z ]+$/.toString(),
								addItemLabel: 'Add favorite food',
							},
							{
								label: 'Best places to visit',
								key: 'places',
								type: 'list',
								size: 10,
								style: {
									width: '75%',
								},
								help: 'An ordered list of nice places to visit',
								orderable: true,
							},
						],
					},
				],
			},
		},
		{
			id: 'theme',
			label: 'Theme',
			icon: 'brightness-6',
			form: {
				groups: [
					{
						fields: [
							{
								label: 'Theme',
								key: 'theme',
								type: 'radio',
								options: [
									{ label: 'System (default)', value: 'system' },
									{ label: 'Light', value: 'light' },
									{ label: 'Dark', value: 'dark' },
								],
								help: 'Light or dark theme?',
							},
						],
					},
				],
			},
		},
	],
});

module.exports = preferences;
