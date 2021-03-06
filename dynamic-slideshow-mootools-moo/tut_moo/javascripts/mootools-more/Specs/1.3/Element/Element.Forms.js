/*
Script: Element.Forms.js
	Specs for Element.Forms.js

License:
	MIT-style license.
*/
(function(){


	var input, selectList, multiselect, radio, radio2, checkbox, textarea;

	window.addEvent('domready', function(){

		var container = new Element('div', {
			styles: {
				height: 1,
				overflow: "hidden"
			}
		}).inject($(document.body));

		input = new Element('input', {
			type: 'text',
			value: '0123456789'
		}).inject(container);

		textarea = new Element('textarea', {
			value: '0123456789'
		}).inject(container);

		selectList = new Element('select', {
		}).inject(container);
		(3).times(function(i){
			var opt = new Element('option', {
				text: i + '_txt'
			}).inject(selectList);
			if (i>0) opt.set('value', i+'_val');
		});

		multiselect = selectList.clone(true).inject(container);
		multiselect.set('multiple', true);

		radio = new Element('input', {
			type: 'radio',
			name: 'radio',
			value: 'radioValue1'
		}).inject(container);

		radio2 = new Element('input', {
			type: 'radio',
			name: 'radio',
			checked: true,
			value: 'radioValue2'
		}).inject(container);

		checkbox = new Element('input', {
			type: 'checkbox',
			name: 'checkbox',
			value: 'checkboxValue'
		}).inject(container);

	});

	describe('Element.getTextInRange', {

		'should get text in a specific range from an input': function(){
			expect(input.getTextInRange(2,5)).toEqual('234');
		},


		'should get a partial match on text in range where the range is outside the bounds of the text': function(){
			expect(input.getTextInRange(8,20)).toEqual('89');
		}

	});

	describe('Element.selectRange', {

		'should select range of text in an input': function(){
			expect(input.selectRange(2,5).getSelectedRange()).toEqual({start: 2, end: 5});
		}

	});

	describe('Element.getSelectedText', {

		'should return selected text in an input': function(){
			expect(input.selectRange(0,10).getSelectedText()).toEqual('0123456789');
		}

	});

	describe('Element.getSelectionStart', {

		'should get the selection start': function(){
			expect(input.selectRange(2,5).getSelectionStart()).toEqual(2);
		}

	});

	describe('Element.getSelectionEnd', {

		'should get the selection end': function(){
			expect(input.selectRange(2,5).getSelectionEnd()).toEqual(5);
		}

	});

	describe('Element.setCaretPosition, Element.getCaretPosition', {

		'should set the caret position': function(){
			expect(input.setCaretPosition(3).getCaretPosition()).toEqual(3);
		}

	});

	describe('Element.getSelectionStart', {

		'should compare the caret position to the selection start': function(){
			expect(input.setCaretPosition(3).getSelectionStart()).toEqual(3);
		}

	});

	describe('Element.insertAtCursor', {

		'should insert at cursor': function(){
			expect(input.setCaretPosition(3).insertAtCursor('test').get('value')).toEqual('012test3456789');
		}

	});

	describe('Element.insertAroundCursor', {

		'should insert around cursor': function(){
			expect(input.set('value', '0123456789').selectRange(2,5).insertAroundCursor({
				before: '{',
				after: '}'
			}).get('value')).toEqual('01{234}56789');
		},


		'should insert around cursor w/o selection': function(){
			expect(input.set('value', '0123456789').setCaretPosition(2).insertAroundCursor({
				before: '{',
				after: '}',
				defaultMiddle: 'X'
			}).get('value')).toEqual('01{X}23456789');
		}

	});

})();
