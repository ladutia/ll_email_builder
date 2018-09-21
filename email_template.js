var tinymceOpts = {
                autoresize_min_height: 300,
                selector: "#editor-box-text, #editor-box-text-2, #editor-box-text-3, #editor-box-text-card, #editor-box-text-caption, #editor-box-text-caption-2, #editor-box-text-video, #eb-editor-html",
                plugins: [
                        "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
                        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                        "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern",
                        "autoresize"
                ],
                toolbar1: "bold italic underline | link unlink image | alignleft aligncenter alignright alignjustify | bullist numlist",
                toolbar2: "heading fontselect fontsizeselect | forecolor backcolor | ltr rtl | code | undo redo",
                content_css: "js/tinymce/tinymce_override.css",
                menubar: false,
                gecko_spellcheck:true,
                browser_spellcheck: true,
                toolbar_items_size: 'small',
                relative_urls : 'false', 
                theme_advanced_buttons3_add : "ltr,rtl",
                forced_root_block : "div",  // old "&nbsp;"
                force_br_newlines : true,
                force_p_newlines : false,
				verify_html : false,
                entity_encoding : "named",
				fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
                setup: function(editor) {
                    
                    editor.addButton('heading', {
                        type: 'menubutton',
                        text: 'Heading',
                        icon: false,
                        menu: [
                            {text: 'Custom Heading 1', onclick: function() {
                                    var opt = $('#bodyTable').data('json');
                                    var h1Shadow = opt.h1ShadowX + 'px ' + opt.h1ShadowY + 'px ' + opt.h1ShadowBlur + 'px ' + opt.h1ShadowColor;
                                    
									editor.execCommand('mceReplaceContent', false, '<p class="eb-h1" style="margin-bottom: 15px; margin-top: 0; line-height: 125%;"><span style="font-size: 30px; line-height: 125%; color: '+opt.h1Color+'; text-shadow: '+h1Shadow+'; ">'+editor.selection.getContent()+'</span></p>');
                            }},
                            {text: 'Custom Heading 2', onclick: function() {
                                    var opt = $('#bodyTable').data('json');
                                    var h2Shadow = opt.h2ShadowX + 'px ' + opt.h2ShadowY + 'px ' + opt.h2ShadowBlur + 'px ' + opt.h2ShadowColor;
                                   
                                    editor.execCommand('mceReplaceContent', false, '<p class="eb-h2" style="margin-bottom: 15px; margin-top: 0; line-height: 125%;"><span style="font-size: 20px; line-height: 125%; color: '+opt.h2Color+'; text-shadow: '+h2Shadow+'; ">'+editor.selection.getContent()+'</span></p>');
                            }},
                            {text: 'Heading 1', onclick: function() {
								editor.execCommand('mceReplaceContent', false, '<h1 style="font-size: 26px; padding:0; margin: 0;">'+editor.selection.getContent()+'</h1>');
                            }},
                            {text: 'Heading 2', onclick: function() {
                                editor.execCommand('mceReplaceContent', false, '<h2 style="font-size: 22px; padding:0; margin: 0;">'+editor.selection.getContent()+'</h2>');
                            }},
                            {text: 'Heading 3', onclick: function() {
                                editor.execCommand('mceReplaceContent', false, '<h3 style="font-size: 16px; padding:0; margin: 0;">'+editor.selection.getContent()+'</h3>');
                            }},
                            {text: 'Heading 4', onclick: function() {
                                editor.execCommand('mceReplaceContent', false, '<h4 style="font-size: 14px; padding:0; margin: 0;">'+editor.selection.getContent()+'</h4>');
                            }},
                            {text: 'Paragraph', onclick: function() {
                                editor.execCommand('mceReplaceContent', false, '<p>'+editor.selection.getContent()+'</p>');
                            }}
                        ]
                    });
                    editor.on("change", function(e){
                        page.tplCode.removeTplCode();
                        page.updateElementTpl();
                    });
                    editor.on("keyup", function(){
                        page.tplCode.removeTplCode();
                        page.updateElementTpl();
                    });
					editor.on("ExecCommand", function(){
                        page.tplCode.removeTplCode();
                        page.updateElementTpl();
                    });
					
                    editor.on("setContent", function(){
                        $("#eb-editor-html_ifr").contents().find("html, body").css('cssText', 'height: auto !important');
                    });
                }
            };
var page = {
    init: function(){
        $('select').chosen();
        $('body').on('click', function(){
            $('.settings-tpl.open').removeClass('open');
        });
        $('.step-nav-template-email').each(function(){
            $(this).css('margin-left',-$(this).width()/2);
        });
        $('.et-tabs > ul li').on('click', function(e){
            e.preventDefault();
            var index = $(this).parent().find('li').index($(this));
            $(this).addClass('active').siblings('li').removeClass('active');
            $(this).parents('.et-tabs').find('.et-tab-content').hide().eq(index).show();
            $('.template, .tmp-theme').removeClass('selected');
            $('.et-top-header .btn-next').addClass('btn-disabled');
        });
        $('.template, .tmp-theme').on('click', function(){
            $(this).addClass('selected').siblings('.template, .tmp-theme').removeClass('selected');
            $('.et-top-header .btn-next').removeClass('btn-disabled');
        });
        $('.et-tabs-gray li').on('click', function(){
            $(this).addClass('active').siblings('li').removeClass('active');
        });
        $('.tabs-editor > ul li').on('click', function(e){
            e.preventDefault();
            var index = $(this).parent().find('li').index($(this));
            $(this).addClass('selected').siblings('li').removeClass('selected');
            $(this).parents('.tabs-editor').find('.wrap-tabs-content .tab-content').hide().eq(index).show();
			if (index == 0){
				page.resizeTinymce();
			}
        });
        $('.settings-tpl > a.et-btn-white').on('click', function(e){
            e.stopPropagation();
            $(this).parent().toggleClass('open');
            return false;
        });
        $('.settings-tpl > ul li a').on('click', function(e){
            e.stopPropagation();
            $(this).parents('.settings-tpl').toggleClass('open');
            return false;
        });
        $('.searh-themes .txt_field').on('keyup', function(){
            var $list = $(this).parents('.panel-sort-search').next('.wrap-tmp-themes');
            var searchText = $(this).val();
            
            if (searchText == ''){
                $list.find('.tmp-theme').show();
            } else{
                $list.find('.tmp-theme').hide();
            }
            
            $list.find('.tmp-theme h3:Contains("'+ searchText +'")').each(function(){
                    $(this).parents('.tmp-theme').show();
            });
        });
        $('.eb-slide-box-head').on('click', function(){
            var $this = $(this);
            if ( !$this.hasClass('eb-opened') ){
                $this.siblings('.eb-slide-box-content:visible').slideToggle(function(){
                    $this.siblings('.eb-slide-box-head.eb-opened').removeClass('eb-opened');
                });
            } else {
                
            }
            $this.toggleClass('eb-opened');
            $this.next('.eb-slide-box-content').slideToggle();
            
            return false;
        });
        
        $('.eb-show-slide-panel').on('click', function(e){
            e.stopPropagation();
            var panel = $(this).attr('data-slide-panel');
            if (panel == 'box-border-text'){
                panel = 'box-text';
            }
            if (panel == 'page-design'){
                $('.wrap-panels-el').css('z-index','1');
                $('#eb-' + panel).addClass('active').show().animate({left: 0},300);
                page.updatePageDesignOptions();
            }
            return false;
        });
        $('.eb-save-panel, .eb-cancel-panel').on('click', function(){
            $('.eb-right-panel-slide.active').removeClass('active').animate({left: '579px'}, 300, function(){
                $(this).hide();
                $('.wrap-panels-el').css('z-index','-1');
            });
            page.tplCode.removeTplCode();
            page.updateElementTpl($(this));
            return false;
        });
        if ( $('.eb-editor-text').length ){
            tinymce.init(tinymceOpts);
        }
        $('.touch-spin').TouchSpin({
            min: 0,
            max: 100
        });
        $('.divider-field').TouchSpin({
            min: 0,
            max: 1000
        });
        $('.eb-list-image').on('click','.lnk-img-browse', function(e){
            e.preventDefault();
            var indexImage = $(this).parents('.item-image').index();
            
            page.browseImage($(this), indexImage);
        });
        $('.eb-list-image').on('click','.lnk-img-remove', function(e){
            e.preventDefault();
            var indexImage = $(this).parents('.item-image').index();
            page.removeImage($(this), indexImage);
        });
        $('.eb-list-image').on('click','.lnk-img-edit', function(e){
            e.preventDefault();
        });
        var resizebleMaxWidth = $('#email-editor').outerWidth()-448;
        var startResizebleWidth = 0;
        
        var $previewColResizable = $('.wrap-preview-col').resizable({
            handles: 'e',
            minWidth: 630,
            maxWidth: resizebleMaxWidth,
            start: function(event, ui) {
                startResizebleWidth = $('.preview-col').outerWidth();
            },
            resize: function(event, ui) {
                var $colRight = $('.tool-col');
                var width = $('#email-editor').outerWidth() - $('.wrap-preview-col').outerWidth();
                $colRight.css('width', width + 'px');
            },
            stop: function(event, ui) {
                $('.wrap-preview-col').css({
                    left: '0',
                    width: 'auto',
                    right: $('.tool-col').outerWidth()
                });
            }
        });
        $(window).resize(function(){
           resizebleMaxWidth = $('#email-editor').outerWidth()-448;
           $previewColResizable.resizable('option', 'maxWidth', resizebleMaxWidth);
        });
        $('.tpl-btn-hide-show-border').on('click', function(e){
            e.preventDefault();
            $('.eb-wrap-email-page').toggleClass('tpl-show-border-box');
            if ( $('.eb-wrap-email-page').hasClass('tpl-show-border-box') ){
                $(this).text('Hide Dashed Border');
            } else {
                $(this).text('Show Dashed Border');
            }
        });
        $('#videoUrlThumbnail').on('keyup', function(){
            var link = $(this).val();
            page.updateVideoImg(link);
        });
		$('.eb-clear-line span').on('click', function(e){
			e.preventDefault();
			var type = $(this).parent().attr('data-type');
			page.clearStyleAll(type);
		});
		$('.wrap-btn-clear-all > a').on('click', function(e){
			e.preventDefault();
			$(this).parents('.eb-style-box').find('.eb-clear-line span').trigger('click');
		});
		$('#start-datetime-calendar-email, #end-datetime-calendar-email').datetimepicker({
            timepicker:true,
            format:'m/d/Y H:i:s',
            value: new Date()
        });
    },
    colorBox: function(){
        $('.color-box').each(function(){
            var color =  $(this).attr('data-color-start');
            $(this).colpick({
                colorScheme:'dark',
                layout:'hex',
                color: color,
                onSubmit:function(hsb,hex,rgb,el) {
                    $(el).css('background-color', '#'+hex);
                    $(el).colpickHide();
                    page.updateColorElTpl(el,hex);
                    
                }
            }).css('background-color', '#'+color);
        });
    },
    codeBox:{
        editor: null,
        init: function(){
            CodeMirror.commands.autocomplete = function(cm) {
                cm.showHint({hint: CodeMirror.hint.anyword});
            }
            page.codeBox.editor = CodeMirror.fromTextArea(document.getElementById("eb-code-editor"), {
                lineNumbers: true,
                lineWrapping: true,
                extraKeys: {"Ctrl-Space": "autocomplete"}
            });
            $('#eb-box-code').hide();
        }
    },
    heightWrapLayout: function(){
        $('.wrap-layout-inner').height($('body').height()-110);
    },
    dragAndDropElements: function(){
		var $scrollBox = $('.eb-inner-tool > .tabs-editor .wrap-tabs-content');
		var scrollTop = 0;
        $( ".eb-block-content" ).draggable({
            helper: 'clone',
            start: function(event, ui) {
                $('.tpl-container').addClass('tpl-placeholder');
				scrollTop = $scrollBox.scrollTop();
				$scrollBox.css('overflow', 'visible');
				
				if( scrollTop > 0 ){
					$scrollBox.css('marginTop', -scrollTop);
					$(ui.helper).css('margin-top', scrollTop);
				}
            },
            stop: function(event, ui) {
                $('.tpl-container').removeClass('tpl-placeholder');
                $('.eb-sortable-hover').removeClass('eb-sortable-hover');
				$scrollBox.css({
					"overflow-y": "auto",
					marginTop: 0
				});
            },
            connectToSortable: ".tpl-container",
            refreshPositions: true
        });
        $('.tpl-container').sortable({
            cursor: 'move',
            handle: '',
			//revert: true,
			//delay:200,
            tolerance: 'pointer',
            cancel: '.eb-dragenddrop-box, .eb-show-code-tpl-block, .eb-dragenddrop-box-text',
            connectWith: '.tpl-container',
            placeholder:'db-placeholder-element',
            beforeStop: function(event, ui) {
                page.addElementTpl(ui);
            },
            start:  function(event, ui) {
                ui.item.parent().addClass('eb-sortable-hover');
            },
            over:  function(event, ui) {
                $('.eb-sortable-hover').removeClass('eb-sortable-hover');
                $(this).addClass('eb-sortable-hover');
            },
            stop:  function(event, ui) {
                ui.item.parent().removeClass('eb-sortable-hover');
                page.isElements();
				
            },
            receive: function(event, ui) {
                if ( ui.item.attr('data-type') == 'box-image-group' ){
                    page.updateWidthGroupColumn(ui.item);
                }
                if ( ui.item.hasClass('eb-block-image-group') ){
                    page.updateWidthGroupColumn($('.tpl-block.tpl-selected'));
                }
                
                if ( ui.item.attr('data-type') == 'box-text' || ui.item.attr('data-type') == 'box-border-text' || ui.item.attr('data-type') == 'box-footer'){
                    page.updateColumnTextTpl(ui.item);
                }
                if ( ui.item.hasClass('eb-block-text') || ui.item.hasClass('eb-block-boxed-text') || ui.item.hasClass('eb-block-footer') ){
                    page.updateColumnTextTpl($('.tpl-block.tpl-selected'));
                }
                
                if ( ui.item.attr('data-type') == 'box-image-card' || ui.item.attr('data-type') == 'box-image-caption' || ui.item.attr('data-type') == 'box-video'){
                    page.captionWidthImg(ui.item);
                }
                if ( ui.item.hasClass('eb-block-image-card') || ui.item.hasClass('eb-block-image-caption') || ui.item.hasClass('eb-block-video') ){
                    page.captionWidthImg($('.tpl-block.tpl-selected'));
                }
                
                if ( ui.item.attr('data-type') == 'box-image' ){
                    page.updateWidthImgs(ui.item);
                }
                
                if ( ui.item.hasClass('eb-show-slide-panel') ){
                    $('.tpl-block.tpl-selected').removeClass('tpl-selected');
                }
            }
        }).disableSelection();
		
		
		
		
    },
    isElements: function(){
        $('.tpl-container').each(function(){
            var countEl = $(this).find('.tpl-block').length;
            var $el = $(this).find('.eb-dragenddrop-box-text');

            if (countEl > 0){
                $el.hide();
                $(this).removeClass('eb-noactive-container');
            } else {
                $el.show();
                $(this).addClass('eb-noactive-container');
            }
        });
        
    },
    addElementTpl: function(ui){
        if (ui.item.hasClass('eb-block-content')){

            var $item = ui.item;
            var elementDrag = null;
            var type = '';
            var content = '';
            var dataAll = '';
            if ( $item.hasClass('eb-block-text') || $item.hasClass('eb-block-boxed-text') || $item.hasClass('eb-block-footer') ){
                var isBoxes = false;
                var padding = 'padding-left:18px; padding-right: 18px; padding-top: 9px; padding-bottom: 9px;';
                if ( $item.hasClass('eb-block-boxed-text') ){
                    type = 'box-border-text';
                    isBoxes = true;
                    padding = 'padding-left:18px; padding-right: 18px; padding-top: 18px; padding-bottom: 18px;';
                } else if( $item.hasClass('eb-block-footer') ){
                    type = 'box-footer';
                    isBoxes = true;
                    padding = 'padding-left:18px; padding-right: 18px; padding-top: 18px; padding-bottom: 18px;';
                } else {
                    type = 'box-text';
                }
                if( $item.hasClass('eb-block-footer') ){
                    dataAll = '{"fontTypeFace": "None", "fontWeight": "None", "fontSize": "None", "boxesIs": '+isBoxes+', "boxesBackgroundColor": "#f2f2f2", "boxesBorderType": "Solid", "boxesBorderWidth": 1, "boxesBorderColor": "#c9c9c9", "color": "#333333", "lineHeight": "None", "textAlign": "None", "columnSplit": 0, "columnSplitType": 0}';
                    elementDrag = '<table style="min-width: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" class="ebTextBlock ebTextBlockFooter">'+
                                    '<tbody class="ebTextBlockOuter">'+
                                        '<tr>'+
                                            '<td valign="top" class="ebTextBlockInner" style="background-color: rgb(242, 242, 242);">'+
                                                '<table style="min-width: 100%;" align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="ebTextContentContainer">'+
                                                    '<tbody>'+
                                                        '<tr>'+
                                                            "<td valign='top' class='ebTextContent' style='background-color: rgb(242, 242, 242); border-style: solid; border-width: 1px; border-color: rgb(201, 201, 201);"+padding+"'>"+
                                                                'Copyright %%CURRENT YEAR%% %%COMPANY NAME%%, All rights reserved.<br><br>Our mailling address is <span style="color: #1f69ad;"><a href="#">%%MAILING ADDRESS%%</a></span>'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</tbody>'+
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>';
                } else {
                    dataAll = '{"fontTypeFace": "None", "fontWeight": "None", "fontSize": "None", "boxesIs": '+isBoxes+', "boxesBackgroundColor": "#ffffff", "boxesBorderType": "None", "boxesBorderWidth": 0, "boxesBorderColor": "#999999", "color": "#333333", "lineHeight": "None", "textAlign": "None", "columnSplit": 0, "columnSplitType": 0}';
                    elementDrag = '<table style="min-width: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" class="ebTextBlock">'+
                                    '<tbody class="ebTextBlockOuter">'+
                                        '<tr>'+
                                            '<td valign="top" class="ebTextBlockInner">'+
                                                '<table style="min-width: 100%;" align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="ebTextContentContainer">'+
                                                    '<tbody>'+
                                                        '<tr>'+
                                                            "<td valign='top' class='ebTextContent' style='border: 0;"+padding+"'>"+
                                                                'This is a Text Block. Use this to provide text...'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</tbody>'+
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>';
                }
                
                        
            } else if ( $item.hasClass('eb-block-divider') ){
                type = 'box-divider';
                dataAll = '{"backgroundColor": "#ffffff", "borderType": "Solid", "borderWidth": 1, "borderColor":"#999999", "paddingTop":"18", "paddingBottom":"18"}';
                elementDrag = '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebDividerBlock" style="background-color: #ffffff;">'+
                                    '<tbody>'+
                                        '<tr>'+
                                            '<td valign="top" class="ebDividerBlockInner" style="padding: 18px 0;">'+
                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="ebDividerContent" style="border-top-width: 1px; border-top-style: solid; border-top-color: #999999;">'+
                                                    '<tbody>'+
                                                        '<tr>'+
                                                            '<td>'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</tbody>'+
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>';
            } else if( $item.hasClass('eb-block-image') ){
                type = 'box-image';
                dataAll = '{"align":0, "margins":0}';
                elementDrag = '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebImageBlock">'+
                                    '<tbody class="ebImageBlockOuter">'+
                                        '<tr>'+
                                           '<td valign="top" class="ebImageBlockInner" style="padding: 9px;">'+
                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="ebImageContentContainer">'+
                                                    '<tbody>'+
                                                        '<tr>'+
                                                            '<td valign="top" align="left" class="ebImageContent" style="padding: 0 9px;">'+
                                                                '<div class="eb-upload-image">'+
                                                                    '<img class="eb-img-upload" src="imgs/imgs_email_builder/img_upload.jpg"/>'+
                                                                    '<p>Drop an Image here</p>'+
                                                                    '<a href="#" class="et-btn-white">Browse</a>'+
                                                                '</div>'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</tbody>'+
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>';
            } else if($item.hasClass('eb-block-image-group')){
                type = 'box-image-group';
                dataAll = '{"count": 2, "layout": 0, "layoutIndex": 0}';
                elementDrag = '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebImageBlock">'+
                                    '<tbody class="ebImageBlockOuter">'+
                                        '<tr>'+
                                            '<td valign="top" class="ebImageBlockInner" style="padding: 9px;">'+
                                                '<table align="left" dataSortId="0" style="width: 282px;" border="0" cellpadding="0" cellspacing="0" width="282px" class="ebImageContentContainer">'+
                                                    '<tbody>'+
                                                        '<tr>'+
                                                            '<td valign="top" class="ebImageContent" style="padding: 0 0 0 9px;">'+
                                                                '<div class="eb-upload-image">'+
                                                                    '<img class="eb-img-upload" src="imgs/imgs_email_builder/img_upload.jpg"/>'+
                                                                    '<p>Drop an Image here</p>'+
                                                                    '<a href="#" class="et-btn-white">Browse</a>'+
                                                                '</div>'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</tbody>'+
                                                '</table>'+
                                                '<table align="right" dataSortId="1" style="width: 282px;" border="0" cellpadding="0" cellspacing="0" width="282px" class="ebImageContentContainer">'+
                                                    '<tbody>'+
                                                        '<tr>'+
                                                            '<td valign="top" class="ebImageContent" style="padding: 0 9px 0 0;">'+
                                                                '<div class="eb-upload-image">'+
                                                                    '<img class="eb-img-upload" src="imgs/imgs_email_builder/img_upload.jpg"/>'+
                                                                    '<p>Drop an Image here</p>'+
                                                                    '<a href="#" class="et-btn-white">Browse</a>'+
                                                                '</div>'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</tbody>'+
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>';
            } else if( $item.hasClass('eb-block-image-card') ){
                type = 'box-image-card';
                dataAll = '{"backgroundColor": "#ffffff", "borderType": "None", "borderWidth": "0", "borderColor":"#999999", "fontTypeFace": "None", "fontWeight": "None", "fontSize": "None", "color":"#333333", "lineHeight": "None", "textAlign": "None", "position": "3", "imgAlignment": "0", "margins": "0", "captionWidth":"0"}';
                elementDrag = '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebImageBlock">'+
                                    '<tbody class="ebImageBlockOuter">'+
                                        '<tr>'+
                                            '<td valign="top" class="ebImageCardBlockInner" style="padding: 9px 18px 0;">'+
                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="ebImageContentContainer">'+
                                                    '<tbody>'+
                                                        '<tr>'+
                                                            '<td valign="top" class="ebImageContent" style="">'+
                                                                '<div class="eb-upload-image">'+
                                                                    '<img class="eb-img-upload" src="imgs/imgs_email_builder/img_upload.jpg"/>'+
                                                                    '<p>Drop an Image here</p>'+
                                                                    '<a href="#" class="et-btn-white">Browse</a>'+
                                                                '</div>'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</tbody>'+
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td valign="top" class="ebTextContent" style="padding: 9px 18px;">'+
                                                'Your text caption goes here'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>';
            } else if( $item.hasClass('eb-block-image-caption') ){
                type = 'box-image-caption';
                dataAll = '{"fontTypeFace": "None", "fontWeight": "None", "fontSize": "None", "color":"#333333", "lineHeight": "None", "textAlign": "None", "position": "3", "imgAlignment": "0", "number": "0", "captionWidth":"0"}';
                elementDrag = '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebImageBlock">'+
                                    '<tbody class="ebImageBlockOuter">'+
                                        '<tr>'+
                                            '<td valign="top" class="ebImageCardBlockInner" style="padding: 9px 18px 0;">'+
                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="ebImageContentContainer">'+
                                                    '<tbody>'+
                                                        '<tr>'+
                                                            '<td valign="top" class="ebImageContent" style="">'+
                                                                '<div class="eb-upload-image">'+
                                                                    '<img class="eb-img-upload" src="imgs/imgs_email_builder/img_upload.jpg"/>'+
                                                                    '<p>Drop an Image here</p>'+
                                                                    '<a href="#" class="et-btn-white">Browse</a>'+
                                                                '</div>'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</tbody>'+
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td valign="top" class="ebTextContent" style="padding: 9px 18px;">'+
                                                ' Your text caption goes here. You can change the position of the caption and set styles in the block’s settings tab.'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>';
            } else if( $item.hasClass('eb-block-social-share') || $item.hasClass('eb-block-social-follow')  || $item.hasClass('eb-block-calendar') ){
                var contentToShare = 1;
                if ( $item.hasClass('eb-block-social-share') ){
                    type = 'box-social-share';
                    var masSocialText = ['Share','Tweet','Share','+1'];
                    var masSocialLink = ['http://www.facebook.com/sharer/sharer.php?u=','http://twitter.com/intent/tweet?text=','http://www.linkedin.com/shareArticle?url=','https://plus.google.com/share?url='];
                    dataAll = '{"containerBackground":"#ffffff", "containerBorderType":"None", "containerBorderWidth":"0", "containerBorderColor":"#ffffff", "btnBackground":"#fafafa", "btnBorderType":"Solid", "btnBorderWidth":"1", "btnBorderColor":"#cccccc", "btnBorderRadius":"5", "fontTypeFace": "Arial", "fontWeight":"None", "fontSize":"12", "color":"#505050", "lineHeight":"None","align": "0", "width":"1","styleIcon":"0", "layout": "1", "contentToShare":"'+contentToShare+'", "shareCustomUrl":"0", "shareLink":"", "shareDesc":""}';
                    elementDrag = '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebShareBlock">'+
                                    '<tbody class="ebShareBlockOuter">'+
                                        '<tr>'+
                                            '<td valign="top" class="ebShareBlockInner" style="padding: 9px;">'+
                                                '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebShareContent">'+
                                                    '<tbody>'+
                                                        '<tr>'+
                                                            '<td valign="top" align="left" class="ebShareContentInner"  style="padding: 0 9px;">'+
                                                                '<table width="auto"  border="0" cellpadding="0" cellspacing="0">'+
                                                                    '<tbody>'+
                                                                        '<tr>'+
                                                                            '<td valign="top" class="ebShareContentItemContainer" style="padding-top: 9px; padding-right: 9px; padding-left: 9px">'+
                                                                                    
                                                                                    '<!--[if mso]>'+
                                                                                    '<table align="center" border="0" cellspacing="0" cellpadding="0">'+
                                                                                    '<tr>'+
                                                                                    '<![endif]-->'+

                                                                                    '<!--[if mso]>'+
                                                                                    '<td align="center" valign="top">'+
                                                                                    '<![endif]-->'+
                                                                                        
                                                                                    '<table data-type-social="0" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                    '<tbody>'+
                                                                                        '<tr>'+
                                                                                            '<td valign="top" class="ebShareContentItemContainer" style="padding-bottom: 9px; padding-right: 9px">'+
                                                                                                '<table class="ebShareContentItem" style="border-collapse: separate; background-color: rgb(250, 250, 250); border: 1px solid #cccccc; border-radius: 5px;" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                                    '<tbody>'+
                                                                                                        '<tr>'+
                                                                                                            '<td style="padding-top:5px; padding-right:9px; padding-bottom:5px; padding-left:9px;" align="left" valign="middle">'+
                                                                                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="">'+
                                                                                                                    '<tbody>'+
                                                                                                                        '<tr>'+
                                                                                                                        '<td class="mcnShareIconContent" align="center" valign="middle" width="28">'+
                                                                                                                            '<a href="'+masSocialLink[0]+'" target="_blank"><img src="imgs/imgs_email_builder/social_btns/black/fb.png" style="display:block;" class="" height="28" width="28"></a>'+
                                                                                                                        '</td>'+
                                                                                                                        '<td class="mcnShareTextContent" style="padding-left:5px;" align="left" valign="middle">'+
                                                                                                                            '<a  href="'+masSocialLink[0]+'" style="color: rgb(80, 80, 80); font-size: 12px; font-weight: normal; line-height: 100%; text-align: center; text-decoration: none;" target="">'+masSocialText[0]+'</a>'+
                                                                                                                        '</td>'+
                                                                                                                        '</tr>'+
                                                                                                                    '</tbody>'+
                                                                                                                '</table>'+
                                                                                                           '</td>'+
                                                                                                        '</tr>'+
                                                                                                    '<tbody>'+
                                                                                                '</table>'+
                                                                                            '</td>'+
                                                                                        '</tr>'+
                                                                                    '</tbody>'+
                                                                                '</table>'+
                                                                                
                                                                                '<!--[if mso]>'+
                                                                                '</td>'+
                                                                                '<![endif]-->'+

                                                                                '<!--[if mso]>'+
                                                                                '<td align="center" valign="top">'+
                                                                                '<![endif]-->'+
                                                                                
                                                                                
                                                                                '<table data-type-social="1" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                    '<tbody>'+
                                                                                        '<tr>'+
                                                                                            '<td valign="top" class="ebShareContentItemContainer" style="padding-bottom: 9px; padding-right: 9px">'+
                                                                                                '<table class="ebShareContentItem" style="border-collapse: separate; background-color: rgb(250, 250, 250); border: 1px solid #cccccc; border-radius: 5px;" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                                    '<tbody>'+
                                                                                                        '<tr>'+
                                                                                                            '<td style="padding-top:5px; padding-right:9px; padding-bottom:5px; padding-left:9px;" align="left" valign="middle">'+
                                                                                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="">'+
                                                                                                                    '<tbody>'+
                                                                                                                        '<tr>'+
                                                                                                                        '<td class="mcnShareIconContent" align="center" valign="middle" width="28">'+
                                                                                                                            '<a href="'+masSocialLink[1]+'" target="_blank"><img src="imgs/imgs_email_builder/social_btns/black/tw.png" style="display:block;" class="" height="28" width="28"></a>'+
                                                                                                                        '</td>'+
                                                                                                                        '<td class="mcnShareTextContent" style="padding-left:5px;" align="left" valign="middle">'+
                                                                                                                            '<a  href="'+masSocialLink[1]+'" style="color: rgb(80, 80, 80); font-size: 12px; font-weight: normal; line-height: 100%; text-align: center; text-decoration: none;" target="">'+masSocialText[1]+'</a>'+
                                                                                                                        '</td>'+
                                                                                                                        '</tr>'+
                                                                                                                    '</tbody>'+
                                                                                                                '</table>'+
                                                                                                            '</td>'+
                                                                                                        '</tr>'+
                                                                                                    '<tbody>'+
                                                                                                '</table>'+
                                                                                            '</td>'+
                                                                                        '</tr>'+
                                                                                    '</tbody>'+
                                                                                '</table>'+
                                                                                
                                                                                '<!--[if mso]>'+
                                                                                '</td>'+
                                                                                '<![endif]-->'+

                                                                                '<!--[if mso]>'+
                                                                                '<td align="center" valign="top">'+
                                                                                '<![endif]-->'+
                                                                                
                                                                               '<table data-type-social="3" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                    '<tbody>'+
                                                                                        '<tr>'+
                                                                                            '<td valign="top" class="ebShareContentItemContainer" style="padding-bottom: 9px; padding-right: 9px">'+
                                                                                                '<table class="ebShareContentItem" style="border-collapse: separate; background-color: rgb(250, 250, 250); border: 1px solid #cccccc; border-radius: 5px;" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                                    '<tbody>'+
                                                                                                        '<tr>'+
                                                                                                            '<td style="padding-top:5px; padding-right:9px; padding-bottom:5px; padding-left:9px;" align="left" valign="middle">'+
                                                                                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="">'+
                                                                                                                    '<tbody>'+
                                                                                                                        '<tr>'+
                                                                                                                        '<td class="mcnShareIconContent" align="center" valign="middle" width="28">'+
                                                                                                                            '<a href="'+masSocialLink[2]+'" target="_blank"><img src="imgs/imgs_email_builder/social_btns/black/in.png" style="display:block;" class="" height="28" width="28"></a>'+
                                                                                                                        '</td>'+
                                                                                                                        '<td class="mcnShareTextContent" style="padding-left:5px;" align="left" valign="middle">'+
                                                                                                                            '<a  href="'+masSocialLink[2]+'" style="color: rgb(80, 80, 80); font-size: 12px; font-weight: normal; line-height: 100%; text-align: center; text-decoration: none;" target="">'+masSocialText[2]+'</a>'+
                                                                                                                        '</td>'+
                                                                                                                        '</tr>'+
                                                                                                                    '</tbody>'+
                                                                                                                '</table>'+
                                                                                                            '</td>'+
                                                                                                        '</tr>'+
                                                                                                    '<tbody>'+
                                                                                                '</table>'+
                                                                                            '</td>'+
                                                                                        '</tr>'+
                                                                                    '</tbody>'+
                                                                                '</table>'+
                                                                                
                                                                                '<!--[if mso]>'+
                                                                                '</td>'+
                                                                                '<![endif]-->'+

                                                                                '<!--[if mso]>'+
                                                                                '<td align="center" valign="top">'+
                                                                                '<![endif]-->'+
                                                                                
                                                                                '<table data-type-social="2" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                    '<tbody>'+
                                                                                        '<tr>'+
                                                                                            '<td valign="top" class="ebShareContentItemContainer" style="padding-bottom: 9px; padding-right: 0">'+
                                                                                                '<table class="ebShareContentItem" style="border-collapse: separate; background-color: rgb(250, 250, 250); border: 1px solid #cccccc; border-radius: 5px;" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                                    '<tbody>'+
                                                                                                        '<tr>'+
                                                                                                            '<td style="padding-top:5px; padding-right:9px; padding-bottom:5px; padding-left:9px;" align="left" valign="middle">'+
                                                                                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="">'+
                                                                                                                    '<tbody>'+
                                                                                                                        '<tr>'+
                                                                                                                        '<td class="mcnShareIconContent" align="center" valign="middle" width="28">'+
                                                                                                                            '<a href="'+masSocialLink[3]+'" target="_blank"><img src="imgs/imgs_email_builder/social_btns/black/gg.png" style="display:block;" class="" height="28" width="28"></a>'+
                                                                                                                        '</td>'+
                                                                                                                        '<td class="mcnShareTextContent" style="padding-left:5px;" align="left" valign="middle">'+
                                                                                                                            '<a  href="'+masSocialLink[3]+'" style="color: rgb(80, 80, 80); font-size: 12px; font-weight: normal; line-height: 100%; text-align: center; text-decoration: none;" target="">'+masSocialText[3]+'</a>'+
                                                                                                                        '</td>'+
                                                                                                                        '</tr>'+
                                                                                                                    '</tbody>'+
                                                                                                                '</table>'+
                                                                                                            '</td>'+
                                                                                                        '</tr>'+
                                                                                                    '<tbody>'+
                                                                                                '</table>'+
                                                                                            '</td>'+
                                                                                        '</tr>'+
                                                                                    '</tbody>'+
                                                                                '</table>'+
                                                                                
                                                                                
                                                                                '<!--[if mso]>'+
                                                                                    '</td>'+
                                                                                    '<![endif]-->'+

                                                                                '<!--[if mso]>'+
                                                                                '</tr>'+
                                                                                '</table>'+
                                                                                '<![endif]-->'+
                                                                                
                                                                                
                                                                            '</td>'+
                                                                        '</tr>'+
                                                                    '</tbody>'+
                                                                '</table>'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</tbody>'+
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>';
                
                } else if ($item.hasClass('eb-block-social-follow')){
                    type = 'box-social-follow';
                    contentToShare = 0;
                    var masSocialText = ['Facebook','Twitter','LinkedIn','Google Plus'];
                    var masSocialLink = ['http://www.facebook.com/','http://www.twitter.com/','http://www.linkedin.com/','http://plus.google.com/'];
                    dataAll = '{"containerBackground":"#ffffff", "containerBorderType":"None", "containerBorderWidth":"0", "containerBorderColor":"#ffffff", "btnBackground":"#ffffff", "btnBorderType":"None", "btnBorderWidth":"0", "btnBorderColor":"#ffffff", "btnBorderRadius":"5", "fontTypeFace": "Arial", "fontWeight":"None", "fontSize":"12", "color":"#505050", "lineHeight":"None","align": "0", "width":"1","styleIcon":"0", "display":"0", "layout": "2", "contentToShare":"'+contentToShare+'", "shareCustomUrl":"0", "shareLink":"", "shareDesc":""}';
                    elementDrag = '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebShareBlock">'+
                                    '<tbody class="ebShareBlockOuter">'+
                                        '<tr>'+
                                            '<td valign="top" class="ebShareBlockInner" style="padding: 9px;">'+
                                                '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebShareContent">'+
                                                    '<tbody>'+
                                                        '<tr>'+
                                                            '<td valign="top" align="left" class="ebShareContentInner"  style="padding: 0 9px;">'+
                                                                '<table width="auto"  border="0" cellpadding="0" cellspacing="0">'+
                                                                    '<tbody>'+
                                                                        '<tr>'+
                                                                            '<td valign="top" class="ebShareContentItemContainer" style="padding-top: 9px; padding-right: 9px; padding-left: 9px">'+
                                                                                    
                                                                                    '<!--[if mso]>'+
                                                                                    '<table align="center" border="0" cellspacing="0" cellpadding="0">'+
                                                                                    '<tr>'+
                                                                                    '<![endif]-->'+

                                                                                    '<!--[if mso]>'+
                                                                                    '<td align="center" valign="top">'+
                                                                                    '<![endif]-->'+
                                                                                        
                                                                                    '<table data-type-social="0" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                    '<tbody>'+
                                                                                        '<tr>'+
                                                                                            '<td valign="top" class="ebShareContentItemContainer" style="padding-bottom: 9px; padding-right: 9px">'+
                                                                                                '<table class="ebShareContentItem" style="border-collapse: separate; background-color: #ffffff; border: 0; border-radius: 5px;" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                                    '<tbody>'+
                                                                                                        '<tr>'+
                                                                                                            '<td style="padding-top:5px; padding-right:9px; padding-bottom:5px; padding-left:9px;" align="left" valign="middle">'+
                                                                                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="">'+
                                                                                                                    '<tbody>'+
                                                                                                                        '<tr>'+
                                                                                                                        '<td class="mcnShareIconContent" align="center" valign="middle" width="28">'+
                                                                                                                            '<a href="'+masSocialLink[0]+'" target="_blank"><img src="imgs/imgs_email_builder/social_btns/black/fb.png" style="display:block;" class="" height="28" width="28"></a>'+
                                                                                                                        '</td>'+
                                                                                                                        '</tr>'+
                                                                                                                    '</tbody>'+
                                                                                                                '</table>'+
                                                                                                           '</td>'+
                                                                                                        '</tr>'+
                                                                                                    '<tbody>'+
                                                                                                '</table>'+
                                                                                            '</td>'+
                                                                                        '</tr>'+
                                                                                    '</tbody>'+
                                                                                '</table>'+
                                                                                
                                                                                '<!--[if mso]>'+
                                                                                '</td>'+
                                                                                '<![endif]-->'+

                                                                                '<!--[if mso]>'+
                                                                                '<td align="center" valign="top">'+
                                                                                '<![endif]-->'+
                                                                                
                                                                                
                                                                                '<table data-type-social="1" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                    '<tbody>'+
                                                                                        '<tr>'+
                                                                                            '<td valign="top" class="ebShareContentItemContainer" style="padding-bottom: 9px; padding-right: 9px">'+
                                                                                                '<table class="ebShareContentItem" style="border-collapse: separate; background-color: #ffffff; border: 0; border-radius: 5px;" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                                    '<tbody>'+
                                                                                                        '<tr>'+
                                                                                                            '<td style="padding-top:5px; padding-right:9px; padding-bottom:5px; padding-left:9px;" align="left" valign="middle">'+
                                                                                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="">'+
                                                                                                                    '<tbody>'+
                                                                                                                        '<tr>'+
                                                                                                                        '<td class="mcnShareIconContent" align="center" valign="middle" width="28">'+
                                                                                                                            '<a href="'+masSocialLink[1]+'" target="_blank"><img src="imgs/imgs_email_builder/social_btns/black/tw.png" style="display:block;" class="" height="28" width="28"></a>'+
                                                                                                                        '</td>'+
                                                                                                                        '</tr>'+
                                                                                                                    '</tbody>'+
                                                                                                                '</table>'+
                                                                                                            '</td>'+
                                                                                                        '</tr>'+
                                                                                                    '<tbody>'+
                                                                                                '</table>'+
                                                                                            '</td>'+
                                                                                        '</tr>'+
                                                                                    '</tbody>'+
                                                                                '</table>'+
                                                                                
                                                                                '<!--[if mso]>'+
                                                                                '</td>'+
                                                                                '<![endif]-->'+

                                                                                '<!--[if mso]>'+
                                                                                '<td align="center" valign="top">'+
                                                                                '<![endif]-->'+
                                                                                
                                                                               '<table data-type-social="3" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                    '<tbody>'+
                                                                                        '<tr>'+
                                                                                            '<td valign="top" class="ebShareContentItemContainer" style="padding-bottom: 9px; padding-right: 9px">'+
                                                                                                '<table class="ebShareContentItem" style="border-collapse: separate; background-color: #ffffff; border: 0; border-radius: 5px;" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                                    '<tbody>'+
                                                                                                        '<tr>'+
                                                                                                            '<td style="padding-top:5px; padding-right:9px; padding-bottom:5px; padding-left:9px;" align="left" valign="middle">'+
                                                                                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="">'+
                                                                                                                    '<tbody>'+
                                                                                                                        '<tr>'+
                                                                                                                        '<td class="mcnShareIconContent" align="center" valign="middle" width="28">'+
                                                                                                                            '<a href="'+masSocialLink[2]+'" target="_blank"><img src="imgs/imgs_email_builder/social_btns/black/in.png" style="display:block;" class="" height="28" width="28"></a>'+
                                                                                                                        '</td>'+
                                                                                                                        '</tr>'+
                                                                                                                    '</tbody>'+
                                                                                                                '</table>'+
                                                                                                            '</td>'+
                                                                                                        '</tr>'+
                                                                                                    '<tbody>'+
                                                                                                '</table>'+
                                                                                            '</td>'+
                                                                                        '</tr>'+
                                                                                    '</tbody>'+
                                                                                '</table>'+
                                                                                
                                                                                '<!--[if mso]>'+
                                                                                '</td>'+
                                                                                '<![endif]-->'+

                                                                                '<!--[if mso]>'+
                                                                                '<td align="center" valign="top">'+
                                                                                '<![endif]-->'+
                                                                                
                                                                                '<table data-type-social="2" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                    '<tbody>'+
                                                                                        '<tr>'+
                                                                                            '<td valign="top" class="ebShareContentItemContainer" style="padding-bottom: 9px; padding-right: 0">'+
                                                                                                '<table class="ebShareContentItem" style="border-collapse: separate; background-color: #ffffff; border: 0; border-radius: 5px;" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                                    '<tbody>'+
                                                                                                        '<tr>'+
                                                                                                            '<td style="padding-top:5px; padding-right:9px; padding-bottom:5px; padding-left:9px;" align="left" valign="middle">'+
                                                                                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="">'+
                                                                                                                    '<tbody>'+
                                                                                                                        '<tr>'+
                                                                                                                        '<td class="mcnShareIconContent" align="center" valign="middle" width="28">'+
                                                                                                                            '<a href="'+masSocialLink[3]+'" target="_blank"><img src="imgs/imgs_email_builder/social_btns/black/gg.png" style="display:block;" class="" height="28" width="28"></a>'+
                                                                                                                        '</td>'+
                                                                                                                        '</tr>'+
                                                                                                                    '</tbody>'+
                                                                                                                '</table>'+
                                                                                                            '</td>'+
                                                                                                        '</tr>'+
                                                                                                    '<tbody>'+
                                                                                                '</table>'+
                                                                                            '</td>'+
                                                                                        '</tr>'+
                                                                                    '</tbody>'+
                                                                                '</table>'+
                                                                                
                                                                                
                                                                                '<!--[if mso]>'+
                                                                                    '</td>'+
                                                                                    '<![endif]-->'+

                                                                                '<!--[if mso]>'+
                                                                                '</tr>'+
                                                                                '</table>'+
                                                                                '<![endif]-->'+
                                                                                
                                                                                
                                                                            '</td>'+
                                                                        '</tr>'+
                                                                    '</tbody>'+
                                                                '</table>'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</tbody>'+
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>';
                } else{
					type = 'box-calendar';
                    contentToShare = 0;
                    var masSocialText = ['Google','Outlook','Yahoo!'];
                    var masSocialLink = ['#','#','#'];
                    dataAll = '{"containerBackground":"#ffffff", "containerBorderType":"None", "containerBorderWidth":"0", "containerBorderColor":"#ffffff", "btnBackground":"#ffffff", "btnBorderType":"None", "btnBorderWidth":"0", "btnBorderColor":"#ffffff", "btnBorderRadius":"5", "fontTypeFace": "Arial", "fontWeight":"None", "fontSize":"12", "color":"#505050", "lineHeight":"None","align": "0", "width":"1","styleIcon":"0", "display":"0", "layout": "2", "contentToShare":"'+contentToShare+'", "shareCustomUrl":"0", "shareLink":"", "shareDesc":""}';
                    elementDrag = '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebShareBlock">'+
                                    '<tbody class="ebShareBlockOuter">'+
                                        '<tr>'+
                                            '<td valign="top" class="ebShareBlockInner" style="padding: 9px;">'+
                                                '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebShareContent">'+
                                                    '<tbody>'+
                                                        '<tr>'+
                                                            '<td valign="top" align="left" class="ebShareContentInner"  style="padding: 0 9px;">'+
                                                                '<table width="auto"  border="0" cellpadding="0" cellspacing="0">'+
                                                                    '<tbody>'+
                                                                        '<tr>'+
                                                                            '<td valign="top" class="ebShareContentItemContainer" style="padding-top: 9px; padding-right: 9px; padding-left: 9px">'+
                                                                                    
                                                                                    '<!--[if mso]>'+
                                                                                    '<table align="center" border="0" cellspacing="0" cellpadding="0">'+
                                                                                    '<tr>'+
                                                                                    '<![endif]-->'+

                                                                                    '<!--[if mso]>'+
                                                                                    '<td align="center" valign="top">'+
                                                                                    '<![endif]-->'+
                                                                                        
                                                                                    '<table data-type-social="12" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                    '<tbody>'+
                                                                                        '<tr>'+
                                                                                            '<td valign="top" class="ebShareContentItemContainer" style="padding-bottom: 9px; padding-right: 9px">'+
                                                                                                '<table class="ebShareContentItem" style="border-collapse: separate; background-color: #ffffff; border: 0; border-radius: 5px;" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                                    '<tbody>'+
                                                                                                        '<tr>'+
                                                                                                            '<td style="padding-top:5px; padding-right:9px; padding-bottom:5px; padding-left:9px;" align="left" valign="middle">'+
                                                                                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="">'+
                                                                                                                    '<tbody>'+
                                                                                                                        '<tr>'+
                                                                                                                        '<td class="mcnShareIconContent" align="center" valign="middle" width="28">'+
                                                                                                                            '<a href="'+masSocialLink[0]+'" target="_blank"><img src="imgs/imgs_email_builder/calendar_btns/black/google.png" style="display:block;" class="" height="28" width="28"></a>'+
                                                                                                                        '</td>'+
                                                                                                                        '</tr>'+
                                                                                                                    '</tbody>'+
                                                                                                                '</table>'+
                                                                                                           '</td>'+
                                                                                                        '</tr>'+
                                                                                                    '<tbody>'+
                                                                                                '</table>'+
                                                                                            '</td>'+
                                                                                        '</tr>'+
                                                                                    '</tbody>'+
                                                                                '</table>'+
                                                                                
                                                                                '<!--[if mso]>'+
                                                                                '</td>'+
                                                                                '<![endif]-->'+

                                                                                '<!--[if mso]>'+
                                                                                '<td align="center" valign="top">'+
                                                                                '<![endif]-->'+
                                                                                
                                                                                
                                                                                '<table data-type-social="13" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                    '<tbody>'+
                                                                                        '<tr>'+
                                                                                            '<td valign="top" class="ebShareContentItemContainer" style="padding-bottom: 9px; padding-right: 9px">'+
                                                                                                '<table class="ebShareContentItem" style="border-collapse: separate; background-color: #ffffff; border: 0; border-radius: 5px;" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                                    '<tbody>'+
                                                                                                        '<tr>'+
                                                                                                            '<td style="padding-top:5px; padding-right:9px; padding-bottom:5px; padding-left:9px;" align="left" valign="middle">'+
                                                                                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="">'+
                                                                                                                    '<tbody>'+
                                                                                                                        '<tr>'+
                                                                                                                        '<td class="mcnShareIconContent" align="center" valign="middle" width="28">'+
                                                                                                                            '<a href="'+masSocialLink[1]+'" target="_blank"><img src="imgs/imgs_email_builder/calendar_btns/black/outlook.png" style="display:block;" class="" height="28" width="28"></a>'+
                                                                                                                        '</td>'+
                                                                                                                        '</tr>'+
                                                                                                                    '</tbody>'+
                                                                                                                '</table>'+
                                                                                                            '</td>'+
                                                                                                        '</tr>'+
                                                                                                    '<tbody>'+
                                                                                                '</table>'+
                                                                                            '</td>'+
                                                                                        '</tr>'+
                                                                                    '</tbody>'+
                                                                                '</table>'+
                                                                                
                                                                                '<!--[if mso]>'+
                                                                                '</td>'+
                                                                                '<![endif]-->'+

                                                                                '<!--[if mso]>'+
                                                                                '<td align="center" valign="top">'+
                                                                                '<![endif]-->'+
                                                                                
                                                                               '<table data-type-social="16" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                    '<tbody>'+
                                                                                        '<tr>'+
                                                                                            '<td valign="top" class="ebShareContentItemContainer" style="padding-bottom: 9px; padding-right: 9px">'+
                                                                                                '<table class="ebShareContentItem" style="border-collapse: separate; background-color: #ffffff; border: 0; border-radius: 5px;" align="left" border="0" cellpadding="0" cellspacing="0">'+
                                                                                                    '<tbody>'+
                                                                                                        '<tr>'+
                                                                                                            '<td style="padding-top:5px; padding-right:9px; padding-bottom:5px; padding-left:9px;" align="left" valign="middle">'+
                                                                                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="">'+
                                                                                                                    '<tbody>'+
                                                                                                                        '<tr>'+
                                                                                                                        '<td class="mcnShareIconContent" align="center" valign="middle" width="28">'+
                                                                                                                            '<a href="'+masSocialLink[2]+'" target="_blank"><img src="imgs/imgs_email_builder/calendar_btns/black/yahoo.png" style="display:block;" class="" height="28" width="28"></a>'+
                                                                                                                        '</td>'+
                                                                                                                        '</tr>'+
                                                                                                                    '</tbody>'+
                                                                                                                '</table>'+
                                                                                                            '</td>'+
                                                                                                        '</tr>'+
                                                                                                    '<tbody>'+
                                                                                                '</table>'+
                                                                                            '</td>'+
                                                                                        '</tr>'+
                                                                                    '</tbody>'+
                                                                                '</table>'+
                                                                                
                                                                                '<!--[if mso]>'+
                                                                                '</td>'+
                                                                                '<![endif]-->'+

                                                                                '<!--[if mso]>'+
                                                                                '</tr>'+
                                                                                '</table>'+
                                                                                '<![endif]-->'+
                                                                                
                                                                                
                                                                            '</td>'+
                                                                        '</tr>'+
                                                                    '</tbody>'+
                                                                '</table>'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</tbody>'+
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>';
				}  
            } else if( $item.hasClass('eb-block-button') ){
                type = 'box-button';
                dataAll = '{"buttonText":"Make Your Purchase", "url":"", "backgroundColor":"#fb8f04", "fontTypeFace": "Arial", "fontWeight": "Bold", "fontSize": "16", "color":"#ffffff", "borderWidth":1, "borderColor":"#fb8f04", "borderType":"Solid", "radius":"3", "padding":"12", "align": 1, "width":0, "vAlign":"0"}';
                elementDrag = '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebButtonBlock">'+
                                    '<tbody class="ebButtonBlockOuter">'+
                                        '<tr>'+
                                            '<td valign="top" align="center" class="ebButtonBlockInner" style="padding: 0 18px 18px;">'+
                                                '<table style="border-collapse: separate !important; border: 1px solid #fb8f04; border-radius: 3px; background-color: #fb8f04;" border="0" cellpadding="0" cellspacing="0" class="ebButtonContentContainer">'+
                                                    '<tbody>'+
                                                        '<tr>'+
                                                            '<td valign="top" align="center" style="font-size: 16px; padding: 12px; font-family: Arial,sans-serif;" class="ebButtonContent">'+
                                                                '<a class="ebButton" title="Make Your Purchase" href="#" target="_blank" style="font-family: Arial,sans-serif; font-weight: bold; letter-spacing: normal; line-height: 100%; text-align: center; text-decoration: none; color: rgb(255, 255, 255);">Make Your Purchase</a>'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</tbody>'+
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>';
            } else if( $item.hasClass('eb-block-code') ){
                type = 'box-code';
                dataAll = '{}';
                elementDrag = '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebTextBlock ebTextBlockCode">'+
                                    '<tbody class="ebTextBlockOuter">'+
                                        '<tr>'+
                                            '<td valign="top" class="ebTextBlockInner" style="padding: 9px 18px;">'+
                                                '<div class="eb-text">Use your own custom HTML</div>'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                               '</table>';
            } else if( $item.hasClass('eb-block-video') ){
                type = 'box-video';
                dataAll = '{"backgroundColor": "#ffffff", "borderType": "None", "borderWidth": "0", "borderColor":"#999999", "fontTypeFace": "None", "fontWeight": "None", "fontSize": "None", "color":"#333333", "lineHeight": "None", "textAlign": "None", "position": "3", "imgAlignment": "0", "margins": "0", "captionWidth":"0","urlVideo":""}';
                elementDrag = '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebImageBlock">'+
                                    '<tbody class="ebImageBlockOuter">'+
                                        '<tr>'+
                                            '<td valign="top" class="ebImageCardBlockInner" style="padding: 9px 18px 0;">'+
                                                '<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="ebImageContentContainer">'+
                                                    '<tbody>'+
                                                        '<tr>'+
                                                            '<td valign="top" class="ebImageContent" style="">'+
                                                                '<div class="eb-upload-image">'+
                                                                    '<img class="eb-img-upload" src="imgs/imgs_email_builder/img_upload.jpg"/>'+
                                                                    '<p>Add Video URL in editor, drop a preview image here</p>'+
                                                                    '<a href="#" class="et-btn-white">Browse</a>'+
                                                                '</div>'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</tbody>'+
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td valign="top" class="ebTextContent" style="padding: 9px 18px;">'+
                                                'Your text caption goes here'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>';
            }
            
            content =   "<div class='tpl-block tpl-selected' data-type='"+type+"' data-json='"+dataAll+"'>"+
                                '<div class="tpl-block-content">'
                                    +elementDrag+
                                '</div>'+
                                '<div class="tpl-block-controls">'+
                                    '<a href="#" class="et-btn-white tpl-block-code"><i></i><span class="tpl-tooltip-btn">Code</span></a>'+
                                    ' <a href="#" class="et-btn-white tpl-block-clone"><i></i><span class="tpl-tooltip-btn">Clone</span></a>'+
                                    ' <a href="#" class="et-btn-white tpl-block-delete"><i></i><span class="tpl-tooltip-btn">Delete</span></a>'+
                                '</div>'+
                            '</div>';
                    
            $(ui.item).replaceWith(content);
            
            $('.eb-block-content.ui-draggable-dragging').remove();
            
            page.isElements();
        }
    },
    addColumnTextTpl: function(count){
        var $tpl = $('.tpl-block.tpl-selected');
		var countColumn = count || 0;

		if ( countColumn == 2 ){
			if ( $tpl.find('.ebTextBlockInner > .ebTextContentContainer').length != 2 ){
				$tpl.find('.ebTextBlockInner').append( $tpl.find('.ebTextBlockInner > .ebTextContentContainer:first').clone() );
				$tpl.find('.ebTextContent').eq(1).html('This is a Text Block. Use this to provide text...');
				tinymce.get('editor-box-text-2').setContent($tpl.find('.ebTextContent').eq(1).html());
			}
		} else if ( countColumn == 3 ){
			if ( $tpl.find('.ebTextBlockInner > .ebTextContentContainer').length != 2 ){
				$tpl.find('.ebTextBlockInner').append( $tpl.find('.ebTextBlockInner > .ebTextContentContainer:first').clone() );
				$tpl.find('.ebTextContent').eq(1).html('This is a Text Block. Use this to provide text...');
				tinymce.get('editor-box-text-2').setContent($tpl.find('.ebTextContent').eq(1).html());
			}
			$tpl.find('.ebTextBlockInner').append( $tpl.find('.ebTextBlockInner > .ebTextContentContainer:first').clone() );
			$tpl.find('.ebTextContent').eq(2).html('This is a Text Block. Use this to provide text...');
			tinymce.get('editor-box-text-3').setContent($tpl.find('.ebTextContent').eq(2).html());
		}
		
        page.updateColumnTextTpl();
    },
    removeColumnTextTpl: function(countColumn){
        var $tpl = $('.tpl-block.tpl-selected');
        var $col = $tpl.find('.ebTextBlockInner .ebTextContentContainer');
		var masCol = [];
		
		$col.each(function(){
			masCol.push($(this).html());
		});
		
		if (countColumn == 2){
			$col.eq(2).remove();
		} else if ( countColumn == 3 ){
			
		} else {
			$tpl.find('.ebTextBlockInner').html('').html('<table class="ebTextContentContainer" style="" width="" cellspacing="0" cellpadding="0" border="0" align="left">' + masCol[0] + '</table>');
			$col = $tpl.find('.ebTextBlockInner .ebTextContentContainer');
			$col.eq(0).css({
				'width':'100%',
				'min-width': '100%'
			}).attr('align','left').attr('width','100%');
			$col.eq(1).remove();
			$col.eq(2).remove();
		}
    },
    updateColumnTextTpl: function(tpl){
        var $tpl = tpl || $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        var $col = null;
        if (typeof opt.columnSplit == 'undefined' || opt.columnSplit == 0)
            return false;
        
        var widthColumn = 291;
        var widthColumn_1 = 382;
        var widthColumn_2 = 196;
		var widthColumn_3 = 191;
        
        if ( $tpl.parents('#template-columns').length ){
            var widthColumn = 141;
            var widthColumn_1 = 180;
            var widthColumn_2 = 102;
        } else if ( $tpl.parents('#tpl-left-sidebar').length || $tpl.parents('#tpl-right-sidebar').length || $tpl.parents('#template-columns-three').length ){
            var widthColumn = 91;
            var widthColumn_1 = 106;
            var widthColumn_2 = 76;
        } else if ( ($tpl.parents('#template-left-sidebar').length && $tpl.parents('#tpl-body').length) ||  ($tpl.parents('#template-right-sidebar').length && $tpl.parents('#tpl-body').length)){
            var widthColumn = 191;
            var widthColumn_1 = 230;
            var widthColumn_2 = 152;
        }

        $col = $tpl.find('.ebTextBlockInner .ebTextContentContainer');
		
		var masCol = [];
		$col.each(function(){
			masCol.push($(this).html());
		});
		
		$tpl.find('.ebTextBlockInner').html('').html('<table class="ebTextContentContainer" style="" width="" cellspacing="0" cellpadding="0" border="0" align="left">' + masCol[0] + '</table> <table class="ebTextContentContainer" style="" width="" cellspacing="0" cellpadding="0" border="0" align="left">' + masCol[1] + '</table>');
		if (masCol.length == 3){
			$tpl.find('.ebTextBlockInner').append('<table class="ebTextContentContainer" style="" width="" cellspacing="0" cellpadding="0" border="0" align="left">' + masCol[2] + '</table>');
		}
		$col = $tpl.find('.ebTextBlockInner .ebTextContentContainer');
		
        if ( opt.columnSplitType == 0){
			$col.css({
				'width': widthColumn + 9 + 'px',
				'min-width': widthColumn + 'px'
			}).attr('width',widthColumn + 'px');
        } else if ( opt.columnSplitType == 1){
            $col.eq(0).css({
				'width': widthColumn_1 + 9 + 'px',
				'min-width': widthColumn_1 + 'px',
			}).attr('width',widthColumn_1 + 'px');
            $col.eq(1).css({
				'width': widthColumn_2 + 9 + 'px',
				'min-width': widthColumn_2 + 'px'
			}).attr('width',widthColumn_2 + 'px');
        } else if ( opt.columnSplitType == 2){
            $col.eq(0).css({
				'width': widthColumn_2 + 9 + 'px',
				'min-width': widthColumn_2 + 'px'
			}).attr('width',widthColumn_2 + 'px');
            $col.eq(1).css('width',widthColumn_1 + 9 + 'px').attr('width',widthColumn_1 + 'px');
			
        } else if ( opt.columnSplitType == 3){
			$col.css({
				'width': widthColumn_3 + 9 + 'px',
				'min-width': widthColumn_3 + 'px'
			}).attr('width',widthColumn_3 + 'px');
		}

        var tableTemplateStart = '<!--[if gte mso 9]><table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;"><tr><![endif]-->';
        var tableTemplateEnd = '<!--[if gte mso 9]></tr></table><![endif]-->';

		if ( opt.columnSplitType == 0){
			$col.eq(0).before(tableTemplateStart + '<!--[if gte mso 9]><td align="center" valign="top" width="'+widthColumn+'"><![endif]-->');
			$col.eq(0).after('<!--[if gte mso 9]></td><![endif]--><!--[if gte mso 9]><td align="center" valign="top" width="'+widthColumn+'"><![endif]-->');
            $col.eq(1).after(tableTemplateEnd);
        } else if ( opt.columnSplitType == 1){
            $col.eq(0).before(tableTemplateStart + '<!--[if gte mso 9]><td align="center" valign="top" width="'+widthColumn_1+'"><![endif]-->');
			$col.eq(0).after('<!--[if gte mso 9]></td><![endif]--><!--[if gte mso 9]><td align="center" valign="top" width="'+widthColumn_2+'"><![endif]-->');
            $col.eq(1).after(tableTemplateEnd);
        } else if ( opt.columnSplitType == 2){
			$col.eq(0).before(tableTemplateStart + '<!--[if gte mso 9]><td align="center" valign="top" width="'+widthColumn_2+'"><![endif]-->');
			$col.eq(0).after('<!--[if gte mso 9]></td><![endif]--><!--[if gte mso 9]><td align="center" valign="top" width="'+widthColumn_1+'"><![endif]-->');
            $col.eq(1).after(tableTemplateEnd);
        } else if( opt.columnSplitType == 3){
			$col.eq(0).before(tableTemplateStart + '<!--[if gte mso 9]><td align="center" valign="top" width="'+widthColumn_3+'"><![endif]-->');
			$col.eq(0).after('<!--[if gte mso 9]></td><![endif]--><!--[if gte mso 9]><td align="center" valign="top" width="'+widthColumn_3+'"><![endif]-->');
			$col.eq(1).after('<!--[if gte mso 9]></td><![endif]--><!--[if gte mso 9]><td align="center" valign="top" width="'+widthColumn_3+'"><![endif]-->');
		    $col.eq(2).after(tableTemplateEnd);
        }
		if(opt.columnSplit == 2){
			$col.eq(2).after('<!--[if gte mso 9]></td><![endif]-->');
		} else{
			$col.eq(1).after('<!--[if gte mso 9]></td><![endif]-->');
		}
		
    },
    actionsBtnBlock: function(){
        $('#templateContainer').on('click','.tpl-block', function(e){
            e.preventDefault();
            e.stopPropagation();
            var $block = $(this);
            var type = $block.data('type');
            var typeSlide = type;
            
            if ( type == 'box-border-text' ){
                typeSlide = 'box-text';
                $('#eb-' + typeSlide).find('.eb-panel-head > span').text('Border Text');
            } else if( type == 'box-text' ){
                $('#eb-' + typeSlide).find('.eb-panel-head > span').text('Text');
            } else if( type == 'box-footer' ){
                typeSlide = 'box-text';
                $('#eb-' + typeSlide).find('.eb-panel-head > span').text('Footer');
            } else if( type == 'box-social-share' ){
                typeSlide = 'box-social-share';
                $('#eb-' + typeSlide).find('.eb-panel-head > span').text('Social Share');
            } else if( type == 'box-social-follow' ){
                typeSlide = 'box-social-share';
                $('#eb-' + typeSlide).find('.eb-panel-head > span').text('Social Follow');
            } else if( type == 'box-calendar' ){
                typeSlide = 'box-social-share';
                $('#eb-' + typeSlide).find('.eb-panel-head > span').text('Calendar');
            }
            
            if ( !$block.hasClass('tpl-selected') ){
                $('.wrap-panels-el').css('z-index','1');
                $('#eb-' + typeSlide).find('.tabs-editor > ul li').removeClass('selected').eq(0).addClass('selected');
                $('#eb-' + typeSlide).find('.tabs-editor .wrap-tabs-content > div.tab-content').hide().eq(0).show();                   
                
                if( $('.eb-right-panel-slide.active').length ){
                    $('.eb-right-panel-slide.active').removeClass('active').animate({left: '589px'}, 300,function(){
                        $(this).hide();
                        $('#eb-' + typeSlide).addClass('active').show().animate({left: 0},300);
                    });
                } else{
                    $('#eb-' + typeSlide).addClass('active').show().animate({left: 0},300);
                } 
            }
            
            $('.tpl-block').removeClass('tpl-selected');
            $block.addClass('tpl-selected');
            page.editElementTpl(type);
            page.tplCode.removeTplCode();
            
        });
        
        $('#templateContainer').on('click','.tpl-block-move', function(e){
            e.preventDefault();
            e.stopPropagation();
            page.tplCode.removeTplCode();
        });
        $('#templateContainer').on('click','.tpl-block-edit', function(e){
            e.preventDefault();
            page.tplCode.removeTplCode();
        });
        $('#templateContainer').on('click','.tpl-block-clone', function(e){
            e.preventDefault();
            e.stopPropagation();
            page.elementsClone($(this));
            page.tplCode.removeTplCode();
        });
        $('#templateContainer').on('click','.tpl-block-delete', function(e){
            e.preventDefault();
            e.stopPropagation();
            $(this).parents('.tpl-block').remove();
            $('.eb-right-panel-slide.active').removeClass('active').css({left: '589px'}).hide();
            $('.wrap-panels-el').css('z-index','-1');
            page.isElements();
            page.tplCode.removeTplCode();
        });
        $('#templateContainer').on('click','.eb-upload-image .et-btn-white', function(e){
            e.preventDefault();
            e.stopPropagation();
        });
        $('#templateContainer').on('click','.tpl-block-code', function(e){
            e.preventDefault();
            e.stopPropagation();
            var $tpl = $(this).parents('.tpl-block');
            $tpl.addClass('tpl-selected').siblings('.tpl-block').removeClass('tpl-selected');
            $('.eb-right-panel-slide.active').removeClass('active').css({left: '589px'}).hide();
            $('.wrap-panels-el').css('z-index','-1');
            page.tplCode.removeTplCode();
            page.tplCode.tplCodeAdd($tpl);
            page.tplCode.tplCodeAction();
        });
    },
    tplCode:{
        editor: null,
        tplBox: null, 
        tplCodeAction: function(){
            $('.eb-close-code-tpl').off('click').on('click', function(e){
                e.preventDefault();
                page.tplCode.tplCodeSave($(this));
            });
        },
        tplCodeSave: function($link){
            var html = page.tplCode.editor.getValue();
            page.tplCode.tplBox.removeClass('tpl-selected');
            page.tplCode.tplBox.find('.tpl-block-content').html(html);
            page.tplCode.removeTplCode();
        },
        removeTplCode: function(){
            $('.eb-show-code-tpl-block').remove();
        },
        tplCodeAdd: function($tpl){
            var codeHtml = $tpl.find('.tpl-block-content').html();
            page.tplCode.tplBox = $tpl;
            $tpl.after('<div class="eb-show-code-tpl-block"><a href="#" class="eb-close-code-tpl">Close</a><div class="eb-code-html"><textarea id="eb-code-html" name="eb-code">'+codeHtml+'</textarea></div></div>');

            CodeMirror.commands.autocomplete = function(cm) {
                cm.showHint({hint: CodeMirror.hint.anyword});
            }
            page.tplCode.editor = CodeMirror.fromTextArea(document.getElementById("eb-code-html"),  {
                lineNumbers: true,
                lineWrapping: true,
                extraKeys: {"Ctrl-Space": "autocomplete"}
            });
        }
    },
    updateColumnEditor:function(opt){
        var $columnEditor = $('.two-text-editor');
		var $ul = $columnEditor.find('ul');
		
        if ( opt.columnSplit == 0){
            $ul.hide();
        } else {
            $columnEditor.find('ul').show();
			if ( opt.columnSplit == 1 ){
				$ul.find('li').show().eq(2).hide();
			} else if ( opt.columnSplit == 2 ){
				$ul.find('li').show();
			}
        }
		
        $ul.find('li').removeClass('selected').eq(0).addClass('selected');
		$columnEditor.find('.eb-text-column').hide().eq(0).show();
    },
    editElementTpl: function(type){
        var $box = $('.tpl-block.tpl-selected');
        var opt = $box.data('json');
        var $slide = null;
        
        if ( type == 'box-text' ||  type == 'box-border-text' ||  type == 'box-footer'){
            $slide =  $('#eb-' + type);
            var $split = $('#splitColumnBoxText');
                  
            tinymce.get('editor-box-text').setContent($box.find('.ebTextContent').eq(0).html());
            
            $('#numberColumnBoxText option').eq(opt.columnSplit).attr('selected', true);
			$tpls = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
			if( $tpls.length ){
				$('#numberColumnBoxText option').eq(2).attr('disabled','disabled').hide();
			}
            $("#numberColumnBoxText").trigger('liszt:updated');
			
			
            if ( opt.columnSplit == 1){
                $split.show();
                $split.find('li').removeClass('selected').eq(opt.columnSplitType).addClass('selected');
                tinymce.get('editor-box-text-2').setContent($box.find('.ebTextContent').eq(1).html());
            } else if ( opt.columnSplit == 2){
                $split.show();
				$split.find('li').removeClass('selected').eq(opt.columnSplitType).addClass('selected');
                tinymce.get('editor-box-text-2').setContent($box.find('.ebTextContent').eq(1).html());
                tinymce.get('editor-box-text-3').setContent($box.find('.ebTextContent').eq(2).html());
            } else{
                $split.hide();
            }
            page.updateColumnEditor(opt);
            $('#boxTextTypeFace option[value="'+opt.fontTypeFace+'"]').attr('selected', true);
            $("#boxTextTypeFace").trigger('liszt:updated');
            
            $('#boxTextWeight option[value="'+opt.fontWeight+'"]').attr('selected', true);
            $("#boxTextWeight").trigger('liszt:updated');
            
            $('#boxTextSize option[value="'+opt.fontSize+'"]').attr('selected', true);
            $("#boxTextSize").trigger('liszt:updated');
            
            $('#boxTextLineHeight option[value="'+opt.lineHeight+'"]').attr('selected', true);
            $("#boxTextLineHeight").trigger('liszt:updated');
            
            $('#boxTextAlign li').removeClass('selected').eq(opt.textAlign).addClass('selected');
            
            $('#boxTextColor').colpickSetColor(opt.color, true).css('background-color', '#' + opt.color);
			$('#boxTextBackground').colpickSetColor(opt.boxesBackgroundColor, true).css('background-color', '#' + opt.boxesBackgroundColor);
            if (opt.boxesIs){
                
                $('#boxTextBorderColor').colpickSetColor(opt.boxesBorderColor, true).css('background-color', '#' + opt.boxesBorderColor);
                $('#boxTextBorderWidth').val(opt.boxesBorderWidth);
                $('#boxTextBorderType option[value="'+opt.boxesBorderType+'"]').attr('selected', true);
                $("#boxTextBorderType").trigger('liszt:updated');
                
                $('#boxes-border').show();
                
            } else {
                $('#boxes-border').hide();
            }
            
            
        } else if( type == 'box-divider' ){
            $('#dividerBackgroundColor').colpickSetColor(opt.backgroundColor, true).css('background-color', opt.backgroundColor);
            $('#dividerBorderColor').colpickSetColor(opt.borderColor, true).css('background-color', opt.borderColor);
            $('#dividerBorderWidth').val(opt.borderWidth);
            $('#dividerBorderType option[value="'+opt.borderType+'"]').attr('selected', true);
            $("#dividerBorderType").trigger('liszt:updated');
            $('#dividerPaddingTop').val(opt.paddingTop);
            $('#dividerPaddingBottom').val(opt.paddingBottom);
        } else if(type == 'box-image-card'){
            tinymce.get('editor-box-text-card').setContent($box.find('.ebTextContent').html());
            $('#cardBackground').colpickSetColor(opt.backgroundColor, true).css('background-color', opt.backgroundColor);
            $('#cardBorderColor').colpickSetColor(opt.borderColor, true).css('background-color', opt.borderColor);
            $('#cardBorderWidth').val(opt.borderWidth);
            $('#cardBorderType option[value="'+opt.borderType+'"]').attr('selected', true);
            $("#cardBorderType").trigger('liszt:updated');
            
            $('#cardTypeFace option[value="'+opt.fontTypeFace+'"]').attr('selected', true);
            $("#cardTypeFace").trigger('liszt:updated');
            $('#cardWeight option[value="'+opt.fontWeight+'"]').attr('selected', true);
            $("#cardWeight").trigger('liszt:updated');
            $('#cardSize option[value="'+opt.fontSize+'"]').attr('selected', true);
            $("#cardSize").trigger('liszt:updated');
            $('#cardTextColor').colpickSetColor(opt.color, true).css('background-color', '#' + opt.color);
            
            $('#cardLineHeight option[value="'+opt.lineHeight+'"]').attr('selected', true);
            $("#cardLineHeight").trigger('liszt:updated');
            
            $('#cardTextAlign li').removeClass('selected').eq(opt.textAlign).addClass('selected');
            
            
            $('#cardPosition option[value="'+opt.position+'"]').attr('selected', true);
            $("#cardPosition").trigger('liszt:updated');
            page.optionsDropdownImage();
            page.updateImageEdge($('#image-edge-card'));
            page.startCountImgOne();
            
        } else if(type == 'box-image-caption'){
            
            tinymce.get('editor-box-text-caption').setContent($box.find('.ebTextContent').eq(0).html());
            
            if ( opt.number == 1){
                tinymce.get('editor-box-text-caption-2').setContent($box.find('.ebTextContent').eq(1).html());
            }
             
            page.updateColumnEditorCaption(opt);
            
            $('#captionTypeFace option[value="'+opt.fontTypeFace+'"]').attr('selected', true);
            $("#captionTypeFace").trigger('liszt:updated');
            $('#captionWeight option[value="'+opt.fontWeight+'"]').attr('selected', true);
            $("#captionWeight").trigger('liszt:updated');
            $('#captionSize option[value="'+opt.fontSize+'"]').attr('selected', true);
            $("#captionSize").trigger('liszt:updated');
            $('#captionTextColor').colpickSetColor(opt.color, true).css('background-color', '#' + opt.color);
            
            $('#captionLineHeight option[value="'+opt.lineHeight+'"]').attr('selected', true);
            $("#captionLineHeight").trigger('liszt:updated');
            
            $('#captionTextAlign li').removeClass('selected').eq(opt.textAlign).addClass('selected');
            
            $('#captionPosition option[value="'+opt.position+'"]').attr('selected', true);
            $("#captionPosition").trigger('liszt:updated');
            
            $('#captionNumber option[value="'+opt.number+'"]').attr('selected', true);
            $("#captionNumber").trigger('liszt:updated');
            page.optionsDropdownImage();
            page.startCountImgOne();
            
        } else if(type == 'box-button'){
            $('#buttonText').val(opt.buttonText);
            $('#buttonBackground').colpickSetColor(opt.backgroundColor, true).css('background-color', opt.backgroundColor);
            $('#buttonBorderColor').colpickSetColor(opt.borderColor, true).css('background-color', opt.borderColor);
            $('#buttonTextColor').colpickSetColor(opt.color, true).css('background-color', opt.color);
            $('#buttonBorderWidth').val(opt.borderWidth);
            $('#buttonBorderType option[value="'+opt.borderType+'"]').attr('selected', true);
            $("#buttonBorderType").trigger('liszt:updated');
            $('#buttonRadius').val(opt.radius);
            $('#buttonPadding').val(opt.padding);
            $('#buttonUrl').val(opt.url);
            $('#buttonTypeFace option[value="'+opt.fontTypeFace+'"]').attr('selected', true);
            $("#buttonTypeFace").trigger('liszt:updated');
            $('#buttonWeight option[value="'+opt.fontWeight+'"]').attr('selected', true);
            $("#buttonWeight").trigger('liszt:updated');
            $('#buttonSize option[value="'+opt.fontSize+'"]').attr('selected', true);
            $("#buttonSize").trigger('liszt:updated');
            $('#buttonAlign option[value="'+opt.align+'"]').attr('selected', true);
            $("#buttonAlign").trigger('liszt:updated');
            $('#buttonVAlign option[value="'+opt.vAlign+'"]').attr('selected', true);
            $("#buttonVAlign").trigger('liszt:updated');
            $('#buttonWidth option[value="'+opt.width+'"]').attr('selected', true);
            $("#buttonWidth").trigger('liszt:updated');
            
        } else if ( type == 'box-image' ){
            $('#imageAlign option[value="'+opt.align+'"]').attr('selected', true);
            $("#imageAlign").trigger('liszt:updated');
            page.updateImageEdge($('#image-edge'));
            page.startCountImgOne();
            
        } else if ( type == 'box-image-group' ){
            page.startLayoutImagesGroup();
            page.startCountImgs();
        } else if ( type == 'box-social-share' || type == 'box-social-follow' || type == 'box-calendar'){

            $('#containerSocialBackground').colpickSetColor(opt.containerBackground, true).css('background-color', opt.containerBackground);
            $('#containerSocialBorderType option[value="'+opt.containerBorderType+'"]').attr('selected', true);
            $("#containerSocialBorderType").trigger('liszt:updated');
            $('#containerSocialBorderWidth').val(opt.containerBorderWidth);
            $('#containerSocialBorderColor').colpickSetColor(opt.containerBorderColor, true).css('background-color', opt.containerBorderColor);
            
            $('#btnSocialBackground').colpickSetColor(opt.btnBackground, true).css('background-color', opt.btnBackground);
            $('#btnSocialBorderType option[value="'+opt.btnBorderType+'"]').attr('selected', true);
            $("#btnSocialBorderType").trigger('liszt:updated');
            $('#btnSocialBorderWidth').val(opt.btnBorderWidth);
            $('#btnSocialBorderColor').colpickSetColor(opt.btnBorderColor, true).css('background-color', opt.btnBorderColor);
            
            $('#btnSocialBorderRadius').val(opt.btnBorderRadius);
            
            $('#btnSocialTypeFace option[value="'+opt.fontTypeFace+'"]').attr('selected', true);
            $("#btnSocialTypeFace").trigger('liszt:updated');
            $('#btnSocialWeight option[value="'+opt.fontWeight+'"]').attr('selected', true);
            $("#btnSocialWeight").trigger('liszt:updated');
            $('#btnSocialSize option[value="'+opt.fontSize+'"]').attr('selected', true);
            $("#btnSocialSize").trigger('liszt:updated');
            $('#btnSocialColor').colpickSetColor(opt.color, true).css('background-color', opt.color);
            
            $('#btnSocialLineHeight option[value="'+opt.lineHeight+'"]').attr('selected', true);
            $("#btnSocialLineHeight").trigger('liszt:updated');
            
            $('#btnSocialAlign option[value="'+opt.align+'"]').attr('selected', true);
            $("#btnSocialAlign").trigger('liszt:updated');
            $('#btnSocialWidth option[value="'+opt.width+'"]').attr('selected', true);
            $("#btnSocialWidth").trigger('liszt:updated');            
            if( type == 'box-social-follow' || type == 'box-calendar' ){
                $('#wrap-social-display').show();
                $('#btnSocialDisplay option[value="'+opt.display+'"]').attr('selected', true);
                $("#btnSocialDisplay").trigger('liszt:updated');
            } else {
                $('#wrap-social-display').hide();
            }
            
            
            
            
            $('.eb-social-style-icon li').eq(opt.styleIcon).addClass('selected').siblings('li').removeClass('selected');
            
            $('#select-content-to-share option[value="'+opt.shareCustomUrl+'"]').attr('selected', true);
            $("#select-content-to-share").trigger('liszt:updated');
            
			$('.eb-social-style-icon').find('li img').show();
			$('.wrap-btn-update-calendar-email, .field-calendar-email').hide();
            if(opt.contentToShare == '1'){
                $('.eb-content-to-share').show();
				
                //$('.eb-social-style-icon').find('.eb-icn-share').show();
                $('.eb-social-style-icon').find('.eb-icn-follow').hide();
				$('.eb-social-style-icon').find('.eb-icn-calendar').hide();
                if(opt.shareCustomUrl == '1'){
                    $('.eb-share-custom-text').show();
                    $('#shareCustomLink').val(opt.shareLink);
                    $('#shareShortDesc').val(opt.shareDesc);
                } else{
                    $('.eb-share-custom-text').hide();
                }
            } else{
				$('.eb-content-to-share').hide();
				if(type == 'box-calendar'){
					$('.eb-social-style-icon').find('li img').hide();
					$('.eb-social-style-icon').find('.eb-icn-calendar').show();
					$('.wrap-btn-update-calendar-email, .field-calendar-email').show();
				} else{
					$('.eb-social-style-icon').find('.eb-icn-share').hide();
					//$('.eb-social-style-icon').find('.eb-icn-follow').show();
					$('.eb-social-style-icon').find('.eb-icn-calendar').hide();
				}
                
            }
            if (opt.display){
                $('.eb-wrap-layout-social').hide();
                if( opt.display == '0' ){
                    $('.eb-wrap-layout-social.iconOnly').show().find('li').removeClass('selected').eq(opt.layout).addClass('selected');
                } else if( opt.display == '1' ){
                    $('.eb-wrap-layout-social.textOnly').show().find('li').removeClass('selected').eq(opt.layout).addClass('selected');
                } else {
                    $('.eb-wrap-layout-social.iconAndText').show().find('li').removeClass('selected').eq(opt.layout).addClass('selected');
                }
            } else {
                $('.eb-wrap-layout-social').hide();
                $('.eb-wrap-layout-social.iconAndTextShare').show().find('li').removeClass('selected').eq(opt.layout).addClass('selected');
            }
            
            
            page.updateSocialGroupHtml();
            page.countGroupSocial();
            /*var $lnk = $box.find('.mcnShareTextContent a');
            $('#eb-fb-link').val($lnk.eq(0).attr('href'));
            $('#eb-tw-link').val($lnk.eq(1).attr('href'));
            $('#eb-in-link').val($lnk.eq(2).attr('href'));
            $('#eb-gg-link').val($lnk.eq(3).attr('href'));
            
            if (opt.lnk1 == 1){
                $('#eb-check-fb').prop('checked', true);
            } else {
                $('#eb-check-fb').prop('checked', false);
            }
            if (opt.lnk2 == 1){
                $('#eb-check-tw').prop('checked', true);
            } else {
                $('#eb-check-tw').prop('checked', false);
            }
            if (opt.lnk3 == 1){
                $('#eb-check-in').prop('checked', true);
            } else {
                $('#eb-check-in').prop('checked', false);
            }
            if (opt.lnk4 == 1){
                $('#eb-check-gg').prop('checked', true);
            } else {
                $('#eb-check-gg').prop('checked', false);
            }*/
            
        } else if ( type == 'box-code' ){
            var html = $box.find('.ebTextBlockInner').html();
            page.codeBox.editor.setValue(html);
        } else if(type == 'box-video'){
            tinymce.get('editor-box-text-video').setContent($box.find('.ebTextContent').html());
            $('#videoBackground').colpickSetColor(opt.backgroundColor, true).css('background-color', opt.backgroundColor);
            $('#videoBorderColor').colpickSetColor(opt.borderColor, true).css('background-color', opt.borderColor);
            $('#videoBorderWidth').val(opt.borderWidth);
            $('#videoBorderType option[value="'+opt.borderType+'"]').attr('selected', true);
            $("#videoBorderType").trigger('liszt:updated');
            
            $('#videoTypeFace option[value="'+opt.fontTypeFace+'"]').attr('selected', true);
            $("#videoTypeFace").trigger('liszt:updated');
            $('#videoWeight option[value="'+opt.fontWeight+'"]').attr('selected', true);
            $("#videoWeight").trigger('liszt:updated');
            $('#videoSize option[value="'+opt.fontSize+'"]').attr('selected', true);
            $("#videoSize").trigger('liszt:updated');
            $('#videoTextColor').colpickSetColor(opt.color, true).css('background-color', '#' + opt.color);
            
            $('#videoLineHeight option[value="'+opt.lineHeight+'"]').attr('selected', true);
            $("#videoLineHeight").trigger('liszt:updated');
            
            $('#videoTextAlign li').removeClass('selected').eq(opt.textAlign).addClass('selected');
            
            
            $('#videoPosition option[value="'+opt.position+'"]').attr('selected', true);
            $("#videoPosition").trigger('liszt:updated');
            page.optionsDropdownImage();
            page.updateImageEdge($('#image-edge-video'));
            page.startCountImgOne();
            page.startVideoImg();
        }
		if( $('.wrap-tabs-content:visible').find('.eb-editor-text').length ){
			page.resizeTinymce();
		}
    },
    updateElementTpl: function($btn){
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        var type;
        var $tplType = $tpl.attr('data-type');
        
        if($btn){
            type = $btn.parents('.eb-right-panel-slide').attr('id');
        } else{
            type = $('.eb-right-panel-slide.active').attr('id');
        }
        
        if ($tplType == 'box-border-text' || $tplType == 'box-footer'){
            $tplType = 'box-text';
        }
        
        if ( type.substr(3) ==  $tplType){
            
            console.log('Update TPL: ' + $tplType);
            
            if ($tplType == 'box-text' || $tplType == 'box-border-text'|| $tplType == 'box-footer'){
                $tpl.find('.ebTextContent').eq(0).html(tinymce.get('editor-box-text').getContent());
                if(opt.columnSplit == 1){
                    $tpl.find('.ebTextContent').eq(1).html(tinymce.get('editor-box-text-2').getContent());
                } else if(opt.columnSplit == 2){
					$tpl.find('.ebTextContent').eq(1).html(tinymce.get('editor-box-text-2').getContent());
					$tpl.find('.ebTextContent').eq(2).html(tinymce.get('editor-box-text-3').getContent());
				}
            } else if ( $tplType == 'box-image-card'){
                $tpl.find('.ebTextContent').eq(0).html(tinymce.get('editor-box-text-card').getContent());
            } else if ( $tplType == 'box-image-caption'){
                $tpl.find('.ebTextContent').eq(0).html(tinymce.get('editor-box-text-caption').getContent());
                
                if ( opt.number == 1 ){
                    $tpl.find('.ebTextContent').eq(1).html(tinymce.get('editor-box-text-caption-2').getContent());
                }
            } else if ( $tplType == 'box-code'){
                var html = page.codeBox.editor.getValue();
                $tpl.find('.ebTextBlockInner').html(html);
            } else if ( $tplType == 'box-video'){
                $tpl.find('.ebTextContent').eq(0).html(tinymce.get('editor-box-text-video').getContent());
            }
            
        } else if ( type.substr(3) == 'page-design' )  {
            
            console.log('Page Design Update');
            
        } else {
            
            console.log('Error TPL UPDATE');
            
        }
        if($btn){
            $tpl.removeClass('tpl-selected');
        }
        
    },
    updatePageDesign: function(){
        var $tpl = $('#bodyTable');
        var opt = $tpl.data('json');
        if(!opt){
            return false;
        }
        $tpl.css({
            backgroundColor: opt.backgroundColor,
            borderTopStyle: opt.borderTopType,
            borderTopWidth: opt.borderTopWidth + 'px',
            borderTopColor: opt.borderTopColor
        });
        
        /*preheader*/
        
        $tpl = $('#tpl-preheader');
        if( $tpl.length ){
            $('#slide-h-preheader').show();
            opt = $tpl.data('json');

            var preheaderAlign = opt.textAlign;

            if ( preheaderAlign == '0' ){
                preheaderAlign = 'left';
            } else if( preheaderAlign == '1'){
                preheaderAlign = 'center';
            } else if( preheaderAlign == '2'){
                preheaderAlign = 'right';
            }
            $('#tpl-preheader').css({
                backgroundColor: opt.backgroundColor,
                borderTopStyle: opt.borderTopType,
                borderTopWidth: opt.borderTopWidth + 'px',
                borderTopColor: opt.borderTopColor,
                borderBottomStyle: opt.borderBottomType,
                borderBottomWidth: opt.borderBottomWidth + 'px',
                borderBottomColor: opt.borderBottomColor,
                fontFamily: opt.fontTypeFace,
                fontSize: opt.fontSize + 'px',
                fontWeight: opt.fontWeight,
                color: opt.color,
                /*REMOVE JS CODE h1-h4*/ //lineHeight: opt.lineHeight + '%',
                textAlign: preheaderAlign
            });
            page.updateInlineCss('preheader');
        } else {
            $('#slide-h-preheader, #slide-c-preheader').hide();
        }
        /*header*/
        $tpl = $('#tpl-header');
        opt = $tpl.data('json');
        
        var headerAlign = opt.textAlign;
        
        if ( headerAlign == '0' ){
            headerAlign = 'left';
        } else if( headerAlign == '1'){
            headerAlign = 'center';
        } else if( headerAlign == '2'){
            headerAlign = 'right';
        }
        $('#tpl-header').css({
            backgroundColor: opt.backgroundColor,
            borderTopStyle: opt.borderTopType,
            borderTopWidth: opt.borderTopWidth + 'px',
            borderTopColor: opt.borderTopColor,
            borderBottomStyle: opt.borderBottomType,
            borderBottomWidth: opt.borderBottomWidth + 'px',
            borderBottomColor: opt.borderBottomColor,
            fontFamily: opt.fontTypeFace,
            fontSize: opt.fontSize + 'px',
            fontWeight: opt.fontWeight,
            color: opt.color,
            /*REMOVE JS CODE h1-h4*/ //lineHeight: opt.lineHeight + '%',
            textAlign: headerAlign
        });
        page.updateInlineCss('header');
        
        /*body*/
        $tpl = $('#tpl-body');
        if( $tpl.length ){
            $('#slide-h-body').show();
            opt = $tpl.data('json');

            var bodyAlign = opt.textAlign;

            if ( bodyAlign == '0' ){
                bodyAlign = 'left';
            } else if( bodyAlign == '1'){
                bodyAlign = 'center';
            } else if( bodyAlign == '2'){
                bodyAlign = 'right';
            }
            $('#tpl-body').css({
                backgroundColor: opt.backgroundColor,
                borderTopStyle: opt.borderTopType,
                borderTopWidth: opt.borderTopWidth + 'px',
                borderTopColor: opt.borderTopColor,
                borderBottomStyle: opt.borderBottomType,
                borderBottomWidth: opt.borderBottomWidth + 'px',
                borderBottomColor: opt.borderBottomColor,
                fontFamily: opt.fontTypeFace,
                fontSize: opt.fontSize + 'px',
                fontWeight: opt.fontWeight,
                color: opt.color,
                /*REMOVE JS CODE h1-h4*/ //lineHeight: opt.lineHeight + '%',
                textAlign: bodyAlign
            });
			
			if( $('#template-right-sidebar, #template-left-sidebar').length ){
				$('#template-right-sidebar, #template-left-sidebar').children('.column-wrapper').find('td:first').css('background-color', opt.backgroundColor);
			}
			
            page.updateInlineCss('body');
        } else {
            $('#slide-h-body, #slide-c-body').hide();
        }
        /*Columns*/
        $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
        if( $tpl.length ){
            $('#slide-h-columns').show();
            if ( $tpl.attr('id') == 'tpl-right-sidebar' || $tpl.attr('id') == 'tpl-left-sidebar' ){
                $('#slide-h-columns').text('Sidebar');
            } else{
                $('#slide-h-columns').text('Columns');
            }
            opt = $tpl.data('json');

            var bodyAlign = opt.textAlign;

            if ( bodyAlign == '0' ){
                bodyAlign = 'left';
            } else if( bodyAlign == '1'){
                bodyAlign = 'center';
            } else if( bodyAlign == '2'){
                bodyAlign = 'right';
            }
            $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar').css({
                backgroundColor: opt.backgroundColor,
                borderTopStyle: opt.borderTopType,
                borderTopWidth: opt.borderTopWidth + 'px',
                borderTopColor: opt.borderTopColor,
                borderBottomStyle: opt.borderBottomType,
                borderBottomWidth: opt.borderBottomWidth + 'px',
                borderBottomColor: opt.borderBottomColor,
                fontFamily: opt.fontTypeFace,
                fontSize: opt.fontSize + 'px',
                fontWeight: opt.fontWeight,
                color: opt.color,
                /*REMOVE JS CODE h1-h4*/ //lineHeight: opt.lineHeight + '%',
                textAlign: bodyAlign
            });
            page.updateInlineCss('columns');
        } else{
            $('#slide-h-columns, #slide-c-columns').hide();
        }
        /*Section Bottom*/
        $tpl = $('#tpl-section-bottom');
        if( $tpl.length ){
            $('#slide-h-section-bottom').show();
            opt = $tpl.data('json');

            var bodyAlign = opt.textAlign;

            if ( bodyAlign == '0' ){
                bodyAlign = 'left';
            } else if( bodyAlign == '1'){
                bodyAlign = 'center';
            } else if( bodyAlign == '2'){
                bodyAlign = 'right';
            }
            $('#tpl-section-bottom').css({
                backgroundColor: opt.backgroundColor,
                borderTopStyle: opt.borderTopType,
                borderTopWidth: opt.borderTopWidth + 'px',
                borderTopColor: opt.borderTopColor,
                borderBottomStyle: opt.borderBottomType,
                borderBottomWidth: opt.borderBottomWidth + 'px',
                borderBottomColor: opt.borderBottomColor,
                fontFamily: opt.fontTypeFace,
                fontSize: opt.fontSize + 'px',
                fontWeight: opt.fontWeight,
                color: opt.color,
                /*REMOVE JS CODE h1-h4*/ //lineHeight: opt.lineHeight + '%',
                textAlign: bodyAlign
            });
            page.updateInlineCss('sectionBottom');
        } else {
            $('#slide-h-section-bottom, #slide-c-section-bottom').hide();
        }
        /*footer*/
        $tpl = $('#tpl-footer');
        opt = $tpl.data('json');
        
        var footerAlign = opt.textAlign;
        
        if ( footerAlign == '0' ){
            footerAlign = 'left';
        } else if( footerAlign == '1'){
            footerAlign = 'center';
        } else if( footerAlign == '2'){
            footerAlign = 'right';
        }
        $('#tpl-footer').css({
            backgroundColor: opt.backgroundColor,
            borderTopStyle: opt.borderTopType,
            borderTopWidth: opt.borderTopWidth + 'px',
            borderTopColor: opt.borderTopColor,
            borderBottomStyle: opt.borderBottomType,
            borderBottomWidth: opt.borderBottomWidth + 'px',
            borderBottomColor: opt.borderBottomColor,
            fontFamily: opt.fontTypeFace,
            fontSize: opt.fontSize + 'px',
            fontWeight: opt.fontWeight,
            color: opt.color,
            /*REMOVE JS CODE h1-h4*/ //lineHeight: opt.lineHeight + '%',
            textAlign: footerAlign
        });
        page.updateInlineCss('footer');
    },
    updateInlineCss: function(box){
        var sheets = document.styleSheets;
        var css = null;
        var cssLink = null;
        var cssBox = null;
        var htmlCss = '';
        for (var i in sheets) {
            if(sheets[i].ownerNode){
                if( sheets[i].ownerNode.id === 'stylesheet_email_builder' ){
                    css = sheets[i].cssRules;
                }
            } 
        }
        
        var $tpl = null;
        if (box == 'preheader'){
            $tpl = $('#tpl-preheader');
            cssBox = css[0];
            cssLink = css[1];
        } else if (box == 'header'){
            $tpl = $('#tpl-header');
            cssBox = css[2];
            cssLink = css[3];
        } else if (box == 'body'){
            $tpl = $('#tpl-body');
            cssBox = css[4];
            cssLink = css[5];
        } else if ( box == 'footer'){
            $tpl = $('#tpl-footer');
            cssBox = css[6];
            cssLink = css[7];
        } else if (box == 'columns'){
            $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            cssBox = css[8];
            cssLink = css[9];
        } else if (box == 'sectionBottom'){
            $tpl = $('#tpl-section-bottom');
            cssBox = css[10];
            cssLink = css[11];
        }
		if ( $tpl != null){
			var opt = $tpl.data('json');
			var linkWeight = 'normal';
			var linkDecoration = 'none';
			var textAlign = 'left';
			
			if (opt.linkWeight == '1'){
				linkWeight = 'bold';
			}

			if( opt.linkDecoration == '1' ){
				linkDecoration = 'underline';
			} else if ( opt.linkDecoration == '2'){
				linkDecoration = 'line-through';
			}
			
			if( opt.textAlign == '1' ){
				textAlign = 'center';
			} else if ( opt.textAlign == '2'){
				textAlign = 'right';
			}
			
			cssLink.style.color = opt.linkColor;
			cssLink.style.fontWeight = linkWeight;
			cssLink.style.textDecoration = linkDecoration;
			
			cssBox.style.color = opt.color;
			cssBox.style.lineHeight = opt.lineHeight + '%';
			cssBox.style.fontSize = opt.fontSize + 'px';
			cssBox.style.fontFamily = opt.fontTypeFace;
			cssBox.style.fontWeight = opt.fontWeight;
			cssBox.style.textAlign = textAlign;
			
			htmlCss = '<style id="stylesheet_email_builder">';
			for (var i = 0; i < css.length; i++) {
				htmlCss += css[i].cssText;
			}
			htmlCss += '</style>';
			console.log(htmlCss); //-  htmlCss - add code style email in template.html
		}
    },
	updateLinkStyle: function(){
		var colorLinkPreheader = $('#tpl-preheader').data('json').linkColor;
		var colorLinkHeader = $('#tpl-header').data('json').linkColor;
		var colorLinkBody = $('#tpl-body').data('json').linkColor;
		var colorLinkSectionBottom = $('#tpl-body').data('json').linkColor;
		var colorLinkFooter = $('#tpl-footer').data('json').linkColor;
		
		$('#tpl-preheader .tpl-block-content a').each(function(){
			if (this.style.color == ''){
				this.style.color = colorLinkPreheader;
			}
		});
		
		$('#tpl-header .tpl-block-content a').each(function(){
			if (this.style.color == ''){
				this.style.color = colorLinkHeader;
			}
		});
		
		$('#tpl-body .tpl-block-content a').each(function(){
			if (this.style.color == ''){
				this.style.color = colorLinkBody;
			}
		});
		
		$('#tpl-footer .tpl-block-content a').each(function(){
			if (this.style.color == ''){
				this.style.color = colorLinkFooter;
			}
		});
		$('#tpl-section-bottom .tpl-block-content a').each(function(){
			if (this.style.color == ''){
				this.style.color = colorLinkSectionBottom;
			}
		});
	},
    updatePageDesignOptions: function(){ 
        var $tpl = $('#bodyTable');
        var opt = $tpl.data('json');
        
        
        $('#pageBackground').colpickSetColor(opt.backgroundColor, true).css('background-color', opt.backgroundColor);
        $('#pageBorderType option[value="'+opt.borderTopType+'"]').attr('selected', true);
        $("#pageBorderType").trigger('liszt:updated');
        $('#pageBorderWidth').val(opt.borderTopWidth);
        $('#pageBorderColor').colpickSetColor(opt.borderTopColor, true).css('background-color', opt.borderTopColor);
        
        $('#boxBorderType option[value="'+opt.boxBorderType+'"]').attr('selected', true);
        $("#boxBorderType").trigger('liszt:updated');
        $('#boxBorderWidth').val(opt.boxBorderWidth);
        $('#boxBorderColor').colpickSetColor(opt.boxBorderColor, true).css('background-color', opt.boxBorderColor);
        
        $('#h1Color').colpickSetColor(opt.h1Color, true).css('background-color', opt.h1Color);
        $('#h2Color').colpickSetColor(opt.h2Color, true).css('background-color', opt.h2Color);
        
        $('#h1ShadowColor').colpickSetColor(opt.h1ShadowColor, true).css('background-color', opt.h1ShadowColor);
        $('#h2ShadowColor').colpickSetColor(opt.h2ShadowColor, true).css('background-color', opt.h2ShadowColor);
        
        $('#h1ShadowX').val(opt.h1ShadowX);
        $('#h1ShadowY').val(opt.h1ShadowY);
        $('#h1ShadowBlur').val(opt.h1ShadowBlur);
        $('#h2ShadowX').val(opt.h2ShadowX);
        $('#h2ShadowY').val(opt.h2ShadowY);
        $('#h2ShadowBlur').val(opt.h2ShadowBlur);
        
        $tpl = $('#tpl-preheader');
        if( $tpl.length ){
            opt = $tpl.data('json');

            $('#preheaderBackground').colpickSetColor(opt.backgroundColor, true).css('background-color', opt.backgroundColor);
            $('#preheaderBorderTopType option[value="'+opt.borderTopType+'"]').attr('selected', true);
            $("#preheaderBorderTopType").trigger('liszt:updated');
            $('#preheaderBorderTopWidth').val(opt.borderTopWidth);
            $('#preheaderBorderTopColor').colpickSetColor(opt.borderTopColor, true).css('background-color', opt.borderTopColor);
            $('#preheaderBorderBottomType option[value="'+opt.borderBottomType+'"]').attr('selected', true);
            $("#preheaderBorderBottomType").trigger('liszt:updated');
            $('#preheaderBorderBottomWidth').val(opt.borderBottomWidth);
            $('#preheaderBorderBottomColor').colpickSetColor(opt.borderBottomColor, true).css('background-color', opt.borderBottomColor);

            $('#preheaderTypeFace option[value="'+opt.fontTypeFace+'"]').attr('selected', true);
            $("#preheaderTypeFace").trigger('liszt:updated');
            $('#preheaderWeight option[value="'+opt.fontWeight+'"]').attr('selected', true);
            $("#preheaderWeight").trigger('liszt:updated');
            $('#preheaderSize option[value="'+opt.fontSize+'"]').attr('selected', true);
            $("#preheaderSize").trigger('liszt:updated');
            $('#preheaderColor').colpickSetColor(opt.color, true).css('background-color', '#' + opt.color);
            $('#preheaderLineHeight option[value="'+opt.lineHeight+'"]').attr('selected', true);
            $("#preheaderLineHeight").trigger('liszt:updated');
            $('#preheaderAlign li').removeClass('selected').eq(opt.textAlign).addClass('selected');

            $('#preheaderLinkColor').colpickSetColor(opt.linkColor, true).css('background-color', '#' + opt.linkColor);
            $('#preheaderLinkWeight option[value="'+opt.linkWeight+'"]').attr('selected', true);
            $("#preheaderLinkWeight").trigger('liszt:updated');
            $('#preheaderLinkDecoration option[value="'+opt.linkDecoration+'"]').attr('selected', true);
            $("#preheaderLinkDecoration").trigger('liszt:updated');
        }
        $tpl = $('#tpl-header');
        opt = $tpl.data('json');
        
        $('#headerBackground').colpickSetColor(opt.backgroundColor, true).css('background-color', opt.backgroundColor);
        $('#headerBorderTopType option[value="'+opt.borderTopType+'"]').attr('selected', true);
        $("#headerBorderTopType").trigger('liszt:updated');
        $('#headerBorderTopWidth').val(opt.borderTopWidth);
        $('#headerBorderTopColor').colpickSetColor(opt.borderTopColor, true).css('background-color', opt.borderTopColor);
        $('#headerBorderBottomType option[value="'+opt.borderBottomType+'"]').attr('selected', true);
        $("#headerBorderBottomType").trigger('liszt:updated');
        $('#headerBorderBottomWidth').val(opt.borderBottomWidth);
        $('#headerBorderBottomColor').colpickSetColor(opt.borderBottomColor, true).css('background-color', opt.borderBottomColor);
        
        $('#headerTypeFace option[value="'+opt.fontTypeFace+'"]').attr('selected', true);
        $("#headerTypeFace").trigger('liszt:updated');
        $('#headerWeight option[value="'+opt.fontWeight+'"]').attr('selected', true);
        $("#headerWeight").trigger('liszt:updated');
        $('#headerSize option[value="'+opt.fontSize+'"]').attr('selected', true);
        $("#headerSize").trigger('liszt:updated');
        $('#headerColor').colpickSetColor(opt.color, true).css('background-color', '#' + opt.color);
        $('#headerLineHeight option[value="'+opt.lineHeight+'"]').attr('selected', true);
        $("#headerLineHeight").trigger('liszt:updated');
        $('#headerAlign li').removeClass('selected').eq(opt.textAlign).addClass('selected');
        
        $('#headerLinkColor').colpickSetColor(opt.linkColor, true).css('background-color', '#' + opt.linkColor);
        $('#headerLinkWeight option[value="'+opt.linkWeight+'"]').attr('selected', true);
        $("#headerLinkWeight").trigger('liszt:updated');
        $('#headerLinkDecoration option[value="'+opt.linkDecoration+'"]').attr('selected', true);
        $("#headerLinkDecoration").trigger('liszt:updated');
        
        $tpl = $('#tpl-body');
        if( $tpl.length ){
            opt = $tpl.data('json');

            $('#bodyBackground').colpickSetColor(opt.backgroundColor, true).css('background-color', opt.backgroundColor);
            $('#bodyBorderTopType option[value="'+opt.borderTopType+'"]').attr('selected', true);
            $("#bodyBorderTopType").trigger('liszt:updated');
            $('#bodyBorderTopWidth').val(opt.borderTopWidth);
            $('#bodyBorderTopColor').colpickSetColor(opt.borderTopColor, true).css('background-color', opt.borderTopColor);
            $('#bodyBorderBottomType option[value="'+opt.borderBottomType+'"]').attr('selected', true);
            $("#bodyBorderBottomType").trigger('liszt:updated');
            $('#bodyBorderBottomWidth').val(opt.borderBottomWidth);
            $('#bodyBorderBottomColor').colpickSetColor(opt.borderBottomColor, true).css('background-color', opt.borderBottomColor);

            $('#bodyTypeFace option[value="'+opt.fontTypeFace+'"]').attr('selected', true);
            $("#bodyTypeFace").trigger('liszt:updated');
            $('#bodyWeight option[value="'+opt.fontWeight+'"]').attr('selected', true);
            $("#bodyWeight").trigger('liszt:updated');
            $('#bodySize option[value="'+opt.fontSize+'"]').attr('selected', true);
            $("#bodySize").trigger('liszt:updated');
            $('#bodyColor').colpickSetColor(opt.color, true).css('background-color', '#' + opt.color);
            $('#bodyLineHeight option[value="'+opt.lineHeight+'"]').attr('selected', true);
            $("#bodyLineHeight").trigger('liszt:updated');
            $('#bodyAlign li').removeClass('selected').eq(opt.textAlign).addClass('selected');

            $('#bodyLinkColor').colpickSetColor(opt.linkColor, true).css('background-color', '#' + opt.linkColor);
            $('#bodyLinkWeight option[value="'+opt.linkWeight+'"]').attr('selected', true);
            $("#bodyLinkWeight").trigger('liszt:updated');
            $('#bodyLinkDecoration option[value="'+opt.linkDecoration+'"]').attr('selected', true);
            $("#bodyLinkDecoration").trigger('liszt:updated');
        }
        $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
        if( $tpl.length ){
            opt = $tpl.data('json');

            $('#columnBackground').colpickSetColor(opt.backgroundColor, true).css('background-color', opt.backgroundColor);
            $('#columnBorderTopType option[value="'+opt.borderTopType+'"]').attr('selected', true);
            $("#columnBorderTopType").trigger('liszt:updated');
            $('#columnBorderTopWidth').val(opt.borderTopWidth);
            $('#columnBorderTopColor').colpickSetColor(opt.borderTopColor, true).css('background-color', opt.borderTopColor);
            $('#columnBorderBottomType option[value="'+opt.borderBottomType+'"]').attr('selected', true);
            $("#columnBorderBottomType").trigger('liszt:updated');
            $('#columnBorderBottomWidth').val(opt.borderBottomWidth);
            $('#columnBorderBottomColor').colpickSetColor(opt.borderBottomColor, true).css('background-color', opt.borderBottomColor);

            $('#columnTypeFace option[value="'+opt.fontTypeFace+'"]').attr('selected', true);
            $("#columnTypeFace").trigger('liszt:updated');
            $('#columnWeight option[value="'+opt.fontWeight+'"]').attr('selected', true);
            $("#columnWeight").trigger('liszt:updated');
            $('#columnSize option[value="'+opt.fontSize+'"]').attr('selected', true);
            $("#columnSize").trigger('liszt:updated');
            $('#columnColor').colpickSetColor(opt.color, true).css('background-color', '#' + opt.color);
            $('#columnLineHeight option[value="'+opt.lineHeight+'"]').attr('selected', true);
            $("#columnLineHeight").trigger('liszt:updated');
            $('#columnAlign li').removeClass('selected').eq(opt.textAlign).addClass('selected');

            $('#columnLinkColor').colpickSetColor(opt.linkColor, true).css('background-color', '#' + opt.linkColor);
            $('#columnLinkWeight option[value="'+opt.linkWeight+'"]').attr('selected', true);
            $("#columnLinkWeight").trigger('liszt:updated');
            $('#columnLinkDecoration option[value="'+opt.linkDecoration+'"]').attr('selected', true);
            $("#columnLinkDecoration").trigger('liszt:updated');
        }
		$tpl = $('#tpl-section-bottom');
        if( $tpl.length ){
            opt = $tpl.data('json');

            $('#sectionBottomBackground').colpickSetColor(opt.backgroundColor, true).css('background-color', opt.backgroundColor);
            $('#sectionBottomBorderTopType option[value="'+opt.borderTopType+'"]').attr('selected', true);
            $("#sectionBottomBorderTopType").trigger('liszt:updated');
            $('#sectionBottomBorderTopWidth').val(opt.borderTopWidth);
            $('#sectionBottomBorderTopColor').colpickSetColor(opt.borderTopColor, true).css('background-color', opt.borderTopColor);
            $('#sectionBottomBorderBottomType option[value="'+opt.borderBottomType+'"]').attr('selected', true);
            $("#sectionBottomBorderBottomType").trigger('liszt:updated');
            $('#sectionBottomBorderBottomWidth').val(opt.borderBottomWidth);
            $('#sectionBottomBorderBottomColor').colpickSetColor(opt.borderBottomColor, true).css('background-color', opt.borderBottomColor);

            $('#sectionBottomTypeFace option[value="'+opt.fontTypeFace+'"]').attr('selected', true);
            $("#sectionBottomTypeFace").trigger('liszt:updated');
            $('#sectionBottomWeight option[value="'+opt.fontWeight+'"]').attr('selected', true);
            $("#sectionBottomWeight").trigger('liszt:updated');
            $('#sectionBottomSize option[value="'+opt.fontSize+'"]').attr('selected', true);
            $("#sectionBottomSize").trigger('liszt:updated');
            $('#sectionBottomColor').colpickSetColor(opt.color, true).css('background-color', '#' + opt.color);
            $('#sectionBottomLineHeight option[value="'+opt.lineHeight+'"]').attr('selected', true);
            $("#sectionBottomLineHeight").trigger('liszt:updated');
            $('#sectionBottomAlign li').removeClass('selected').eq(opt.textAlign).addClass('selected');

            $('#sectionBottomLinkColor').colpickSetColor(opt.linkColor, true).css('background-color', '#' + opt.linkColor);
            $('#sectionBottomLinkWeight option[value="'+opt.linkWeight+'"]').attr('selected', true);
            $("#sectionBottomLinkWeight").trigger('liszt:updated');
            $('#sectionBottomLinkDecoration option[value="'+opt.linkDecoration+'"]').attr('selected', true);
            $("#sectionBottomLinkDecoration").trigger('liszt:updated');
        }
		
		
        $tpl = $('#tpl-footer');
        opt = $tpl.data('json');
        
        $('#footerBackground').colpickSetColor(opt.backgroundColor, true).css('background-color', opt.backgroundColor);
        $('#footerBorderTopType option[value="'+opt.borderTopType+'"]').attr('selected', true);
        $("#footerBorderTopType").trigger('liszt:updated');
        $('#footerBorderTopWidth').val(opt.borderTopWidth);
        $('#footerBorderTopColor').colpickSetColor(opt.borderTopColor, true).css('background-color', opt.borderTopColor);
        $('#footerBorderBottomType option[value="'+opt.borderBottomType+'"]').attr('selected', true);
        $("#footerBorderBottomType").trigger('liszt:updated');
        $('#footerBorderBottomWidth').val(opt.borderBottomWidth);
        $('#footerBorderBottomColor').colpickSetColor(opt.borderBottomColor, true).css('background-color', opt.borderBottomColor);
        
        $('#footerTypeFace option[value="'+opt.fontTypeFace+'"]').attr('selected', true);
        $("#footerTypeFace").trigger('liszt:updated');
        $('#footerWeight option[value="'+opt.fontWeight+'"]').attr('selected', true);
        $("#footerWeight").trigger('liszt:updated');
        $('#footerSize option[value="'+opt.fontSize+'"]').attr('selected', true);
        $("#footerSize").trigger('liszt:updated');
        $('#footerColor').colpickSetColor(opt.color, true).css('background-color', '#' + opt.color);
        $('#footerLineHeight option[value="'+opt.lineHeight+'"]').attr('selected', true);
        $("#footerLineHeight").trigger('liszt:updated');
        $('#footerAlign li').removeClass('selected').eq(opt.textAlign).addClass('selected');
        
        $('#footerLinkColor').colpickSetColor(opt.linkColor, true).css('background-color', '#' + opt.linkColor);
        $('#footerLinkWeight option[value="'+opt.linkWeight+'"]').attr('selected', true);
        $("#footerLinkWeight").trigger('liszt:updated');
        $('#footerLinkDecoration option[value="'+opt.linkDecoration+'"]').attr('selected', true);
        $("#footerLinkDecoration").trigger('liszt:updated');
        
        
        
    },
    updateIndividualElTpl: function(){
        var $tpl = null;
        var opt = null;
        
        function updateInfElTpl(){
            $tpl = $('.tpl-block.tpl-selected');
            opt = $tpl.data('json');
        }
        
        /*Text Box or Text Border Box or Footer Box*/
        $('#boxTextTypeFace').change(function(){
            updateInfElTpl();
            
            opt.fontTypeFace = $(this).val();
            if(opt.fontTypeFace == "None"){
                $tpl.find('.ebTextContent').css('font-family','');
            } else {
                $tpl.find('.ebTextContent').css('font-family',opt.fontTypeFace + ', sans-serif');
            }
            
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#boxTextWeight').change(function(){
            updateInfElTpl();
            
            opt.fontWeight = $(this).val();
            $tpl.find('.ebTextContent').css('font-weight',opt.fontWeight);
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#boxTextSize').change(function(){
            updateInfElTpl();
            
            opt.fontSize = $(this).val();
            $tpl.find('.ebTextContent').css('font-size',opt.fontSize + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#boxTextLineHeight').change(function(){
            updateInfElTpl();
            var val = $(this).val();
            
            opt.lineHeight = val;
            if (val == 'None'){
                $tpl.find('.ebTextContent').css('line-height','normal');
            }else{
                $tpl.find('.ebTextContent').css('line-height',opt.lineHeight + '%');
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#boxTextAlign li').on('click', function(){
            updateInfElTpl();
            var $li = $(this);
            var index = $li.index();
            $li.addClass('selected').siblings('li').removeClass('selected');
            opt.textAlign = index;
            if (index == 0){
                $tpl.find('.ebTextContent').css('text-align','left');
            } else if(index == 1){
                $tpl.find('.ebTextContent').css('text-align','center');
            } else if (index == 2){
                $tpl.find('.ebTextContent').css('text-align','right');
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#boxTextBorderWidth').on('change', function () {
            updateInfElTpl();
            
            opt.boxesBorderWidth = $(this).val();
            $tpl.find('.ebTextContentContainer .ebTextContent').css('border-width',opt.boxesBorderWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#boxTextBorderType').change(function(){
            updateInfElTpl();
            var val = $(this).val();
            opt.boxesBorderType = val;
            if (val == 'None'){
                $tpl.find('.ebTextContentContainer .ebTextContent').css('border-style','');
            } else{
                $tpl.find('.ebTextContentContainer .ebTextContent').css('border-style',opt.boxesBorderType.toLowerCase());
            }
            $tpl.find('.ebTextContentContainer .ebTextContent').css('border-color',opt.boxesBorderColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('.two-text-editor ul li a, .two-caption-editor ul li a').on('click', function(e){
            e.preventDefault();
            updateInfElTpl();
   
            var $li = $(this).parent();
            var $box = $li.parents('.two-text-editor, .two-caption-editor');
            var index = $li.index();
            $li.addClass('selected').siblings('li').removeClass('selected');
            $box.find('.eb-text-column, .eb-caption-column').hide().eq(index).show();
            
			page.resizeTinymce();
        });
        
        $('#numberColumnBoxText').change(function(){
            updateInfElTpl();
            
            var $split = $('#splitColumnBoxText');
            var val = $(this).val();
            if (opt.columnSplit != val){
                
                opt.columnSplit = val;
                opt.columnSplitType = 0;
				$tpl.attr('data-json', JSON.stringify( opt ));
                
                if ( val == 1){
					
                    $split.show();
					$split.find('.eb-list-layout li').show().eq(3).hide();
                    $('#splitColumnBoxText ul li').eq(0).addClass('selected').siblings('li').removeClass('selected');
                    page.removeColumnTextTpl(2);
					page.addColumnTextTpl(2);
                } else if ( val == 2){
					opt.columnSplitType = 3;
					$tpl.attr('data-json', JSON.stringify( opt ));
					$split.show();
					$split.find('.eb-list-layout li').hide().eq(3).show();
                    $('#splitColumnBoxText ul li').eq(3).addClass('selected').siblings('li').removeClass('selected');
                    page.addColumnTextTpl(3);
				} else {
                    $split.hide();
                    page.removeColumnTextTpl(1);
                }
                
                page.updateColumnEditor(opt);
            }
        });
        $('#splitColumnBoxText ul li').on('click', function(){
            updateInfElTpl();
            
            $(this).addClass('selected').siblings('li').removeClass('selected');
            var index = $(this).index();
            
            opt.columnSplitType = index;
            $tpl.attr('data-json', JSON.stringify( opt ));
            page.updateColumnTextTpl();
        });
        

        /*Divider*/
        $('#dividerBorderType').change(function(){
            updateInfElTpl();
            var val = $(this).val();
            opt.borderType = val;
            if (val == 'None'){
                $tpl.find('.ebDividerContent').css('border-top-style','');
            } else{
                $tpl.find('.ebDividerContent').css('border-top-style',opt.borderType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#dividerBorderWidth').change(function(){
            updateInfElTpl();
            opt.borderWidth = $(this).val();
            $tpl.find('.ebDividerContent').css('border-top-width', opt.borderWidth + "px");
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#dividerPaddingTop').change(function(){
            updateInfElTpl();
            
            opt.paddingTop = $(this).val();
            $tpl.find('.ebDividerBlockInner').css('padding-top', opt.paddingTop + "px");
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#dividerPaddingBottom').change(function(){
            updateInfElTpl();
            opt.paddingBottom = $(this).val();
            $tpl.find('.ebDividerBlockInner').css('padding-bottom', opt.paddingBottom + "px");
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        /*Buttons*/
        $('#buttonText').on('keyup', function(){
            updateInfElTpl();
            opt.buttonText = $(this).val();
            $tpl.find('.ebButton').text(opt.buttonText);
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#buttonUrl').on('keyup', function(){
            updateInfElTpl();
            opt.url = $(this).val();
            $tpl.find('.ebButton').attr('href',opt.url);
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#buttonTypeFace').change(function(){
            updateInfElTpl();
            opt.fontTypeFace = $(this).val();
            if(opt.fontTypeFace == "None"){
                $tpl.find('.ebButtonContent').css('font-family','');
                $tpl.find('.ebButtonContent .ebButton').css('font-family','');
            } else{
                $tpl.find('.ebButtonContent').css('font-family',opt.fontTypeFace + ', sans-serif');
                $tpl.find('.ebButtonContent .ebButton').css('font-family',opt.fontTypeFace + ', sans-serif');
            }
            
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#buttonWeight').change(function(){
            updateInfElTpl();
            var val = $(this).val();
            opt.fontWeight = val;
            if (val == 'None'){
                $tpl.find('.ebButton').css('font-weight','');
            } else{
                $tpl.find('.ebButton').css('font-weight',opt.fontWeight);
            }
            
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#buttonSize').change(function(){
            updateInfElTpl();
            opt.fontSize = $(this).val();
            $tpl.find('.ebButtonContent').css('font-size',opt.fontSize + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#buttonBorderWidth').on('change', function () {
            updateInfElTpl();
            opt.boxesBorderWidth = $(this).val();
            $tpl.find('.ebButtonContentContainer').css('border-width',opt.boxesBorderWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#buttonBorderType').change(function(){
            updateInfElTpl();
            var val = $(this).val();
            opt.boxesBorderType = val;
            if (val == 'None'){
                $tpl.find('.ebButtonContentContainer').css('border-style','');
            } else{
                $tpl.find('.ebButtonContentContainer').css('border-style',opt.boxesBorderType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#buttonRadius').on('change', function () {
            updateInfElTpl();
            opt.radius = $(this).val();
            $tpl.find('.ebButtonContentContainer').css('border-radius',opt.radius + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#buttonPadding').on('change', function () {
            updateInfElTpl();
            opt.padding = $(this).val();
            $tpl.find('.ebButtonContent').css('padding',opt.padding + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#buttonAlign').on('change', function () {
            updateInfElTpl();
            var val = $(this).val();
            var $el = $tpl.find('.ebButtonBlockInner');
            opt.align = val;
            if (val == 0){
                $el.attr('align','left').find('td').attr('align','left');
            } else if ( val == 1 ){
                $el.attr('align','center').find('td').attr('align','center');
            } else{
                $el.attr('align','right').find('td').attr('align','right');
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#buttonVAlign').on('change', function () {
            updateInfElTpl();
            var val = $(this).val();
            var $el = $tpl.find('.ebButtonBlockInner');
            opt.vAlign = val;
            
            if (val == 0){
                $el.css('padding','0 18px 18px');
            } else if ( val == 1 ){
                $el.css('padding','9px 18px');
            } else{
                $el.css('padding','18px 18px 0');
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#buttonWidth').on('change', function () {
            updateInfElTpl();
            var val = $(this).val();
            var $el = $tpl.find('.ebButtonContentContainer');
            opt.width = val;
            if (val == 0){
                $el.attr('width','');
            } else if ( val == 1 ){
                $el.attr('width','100%');
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        /*Image*/
        $('#imageAlign').on('change', function () {
            updateInfElTpl();
            var val = $(this).val();
            var $el = $tpl.find('.ebImageContent');
            opt.align = val;
            if (val == 0){
                $el.css('text-align','left').attr('align','left').children('img').attr('align','left');
            } else if ( val == 1 ){
                $el.css('text-align','center').attr('align','center').children('img').attr('align','center');
            } else{
                $el.css('text-align','right').attr('align','right').children('img').attr('align','right');
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        /*Image Group*/
        $('#imgColumnGroup .eb-list-layout li').on('click', function(){
            var $tpl = $('.tpl-block.tpl-selected');
            var opt = $tpl.data('json');
            opt.layoutIndex = $(this).attr('data-index');
            $tpl.attr('data-json', JSON.stringify( opt ));
            page.positionImagesGroup(opt.layoutIndex);
            $(this).addClass('selected').siblings('li').removeClass('selected');
            page.updateWidthImgs();
        });
        
        /*Image Card*/
        $('#cardTypeFace, #videoTypeFace').change(function(){
            updateInfElTpl();
            
            opt.fontTypeFace = $(this).val();
            if(opt.fontTypeFace == "None"){
                $tpl.find('.ebTextContent').css('font-family','');
            } else{
                $tpl.find('.ebTextContent').css('font-family',opt.fontTypeFace + ', sans-serif');
            }
            
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#cardWeight, #videoWeight').change(function(){
            updateInfElTpl();
            
            opt.fontWeight = $(this).val();
            $tpl.find('.ebTextContent').css('font-weight',opt.fontWeight);
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#cardSize, #videoSize').change(function(){
            updateInfElTpl();
            
            opt.fontSize = $(this).val();
            $tpl.find('.ebTextContent').css('font-size',opt.fontSize + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#cardLineHeight, #videoLineHeight').change(function(){
            updateInfElTpl();
            var val = $(this).val();
            
            opt.lineHeight = val;
            if (val == 'None'){
                $tpl.find('.ebTextContent').css('line-height','normal');
            }else{
                $tpl.find('.ebTextContent').css('line-height',opt.lineHeight + '%');
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#cardTextAlign li, #videoTextAlign li').on('click', function(){
            updateInfElTpl();
            var $li = $(this);
            var index = $li.index();
            $li.addClass('selected').siblings('li').removeClass('selected');
            opt.textAlign = index;
            if (index == 0){
                $tpl.find('.ebTextContent').css('text-align','left');
            } else if(index == 1){
                $tpl.find('.ebTextContent').css('text-align','center');
            } else if (index == 2){
                $tpl.find('.ebTextContent').css('text-align','right');
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#cardBorderWidth, #videoBorderWidth').on('change', function () {
            updateInfElTpl();
            
            opt.borderWidth = $(this).val();
            $tpl.find('.ebImageBlock').css('border-width',opt.borderWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#cardBorderType, #videoBorderType').change(function(){
            updateInfElTpl();
            var val = $(this).val();
            opt.borderType = val;
            if (val == 'None'){
                $tpl.find('.ebImageBlock').css('border-style','');
            } else{
                $tpl.find('.ebImageBlock').css('border-style',opt.borderType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#cardPosition').change(function(){
            updateInfElTpl();
            opt.position = $(this).val();
            $tpl.attr('data-json', JSON.stringify( opt ));
            page.captionPosition(opt.position);
            page.updateImageEdge($('#image-edge-card'));
            page.updateWidthImgs();
        });
        $('#videoPosition').change(function(){
            updateInfElTpl();
            opt.position = $(this).val();
            $tpl.attr('data-json', JSON.stringify( opt ));
            page.captionPosition(opt.position);
            page.updateImageEdge($('#image-edge-video'));
            page.updateWidthImgs();
        });
        $('#cardImgAlignment, #videoImgAlignment').change(function(){
            updateInfElTpl();
            opt.imgAlignment = $(this).val();
            $tpl.attr('data-json', JSON.stringify( opt ));
            page.alignmentImg();
        });
        $('#cardCaptionWidth, #videoCaptionWidth').change(function(){
            updateInfElTpl();
            opt.captionWidth = $(this).val();
            $tpl.attr('data-json', JSON.stringify( opt ));
           page.captionWidthImg();
           page.updateWidthImgs();
        });
        
        $('#image-edge, #image-edge-card, #image-edge-video').change(function(){
            page.isImageEdge($(this));
        });
        /*Image Caption*/
        $('#captionTypeFace').change(function(){
            updateInfElTpl();
            
            opt.fontTypeFace = $(this).val();
            if(opt.fontTypeFace == "None"){
                $tpl.find('.ebTextContent').css('font-family','');
            } else{
                $tpl.find('.ebTextContent').css('font-family',opt.fontTypeFace + ', sans-serif');
            }
            
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#captionWeight').change(function(){
            updateInfElTpl();
            
            opt.fontWeight = $(this).val();
            $tpl.find('.ebTextContent').css('font-weight',opt.fontWeight);
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#captionSize').change(function(){
            updateInfElTpl();
            
            opt.fontSize = $(this).val();
            $tpl.find('.ebTextContent').css('font-size',opt.fontSize + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#captionLineHeight').change(function(){
            updateInfElTpl();
            var val = $(this).val();
            
            opt.lineHeight = val;
            if (val == 'None'){
                $tpl.find('.ebTextContent').css('line-height','normal');
            }else{
                $tpl.find('.ebTextContent').css('line-height',opt.lineHeight + '%');
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#captionTextAlign li').on('click', function(){
            updateInfElTpl();
            var $li = $(this);
            var index = $li.index();
            $li.addClass('selected').siblings('li').removeClass('selected');
            opt.textAlign = index;
            if (index == 0){
                $tpl.find('.ebTextContent').css('text-align','left');
            } else if(index == 1){
                $tpl.find('.ebTextContent').css('text-align','center');
            } else if (index == 2){
                $tpl.find('.ebTextContent').css('text-align','right');
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#captionPosition').change(function(){
            updateInfElTpl();
            opt.position = $(this).val();
            $tpl.attr('data-json', JSON.stringify( opt ));
            page.captionPosition(opt.position);
            page.updateWidthImgs();
        });
        $('#captionImgAlignment').change(function(){
            updateInfElTpl();
            opt.imgAlignment = $(this).val();
            $tpl.attr('data-json', JSON.stringify( opt ));
            page.alignmentImg();
        });
        $('#captionCaptionWidth').change(function(){
            updateInfElTpl();
            opt.captionWidth = $(this).val();
            $tpl.attr('data-json', JSON.stringify( opt ));
           page.captionWidthImg();
           page.updateWidthImgs();
        });
        $('#captionNumber').change(function(){
            updateInfElTpl();
            
            var val = $(this).val();
            
            if ( val == 1){
                page.addColumnCaptionTpl();
            } else {
                page.removeColumnCaptionTpl();
            }
            
            opt.number = val;
            $tpl.attr('data-json', JSON.stringify( opt ));
            page.updateColumnEditorCaption(opt);
        });
        
        $('#pageBorderWidth').on('change', function () {
            var $tpl = $('#bodyTable');
            var opt = $tpl.data('json');
            opt.borderTopWidth = $(this).val();
            $tpl.css('borderTopWidth',opt.borderTopWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#pageBorderType').change(function(){
            var $tpl = $('#bodyTable');
            var opt = $tpl.data('json');
            opt.borderTopType = $(this).val();
            $tpl.css('borderTopStyle',opt.borderTopType);
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        $('#boxBorderWidth').on('change', function () {
            var $tpl = $('#bodyTable');
            var opt = $tpl.data('json');
            opt.boxBorderWidth = $(this).val();
            $('#templateContainerWrap').css('borderWidth',opt.boxBorderWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
            ( opt.boxBorderType != 'None' ) ? page.callCaptionWidthImg() : null;
        });
        $('#boxBorderType').change(function(){
            var $tpl = $('#bodyTable');
            var opt = $tpl.data('json');
            opt.boxBorderType = $(this).val();
            $('#templateContainerWrap').css('borderStyle',opt.boxBorderType);
            $tpl.attr('data-json', JSON.stringify( opt ));
            page.callCaptionWidthImg();
        });
        
        /*Social*/
        
        $('#containerSocialBorderType').change(function(){
            updateInfElTpl();
            var val = $(this).val();
            opt.containerBorderType = val;
            if (val == 'None'){
                $tpl.find('.ebShareContent').css('border-style','');
            } else{
                $tpl.find('.ebShareContent').css('border-style',opt.containerBorderType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#containerSocialBorderWidth').on('change', function () {
            updateInfElTpl();
            
            opt.containerBorderWidth = $(this).val();
            $tpl.find('.ebShareContent').css('border-width',opt.containerBorderWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#btnSocialBorderType').change(function(){
            updateInfElTpl();
            var val = $(this).val();
            opt.btnBorderType = val;
            if (val == 'None'){
                $tpl.find('.ebShareContentItem').css('border-style','');
            } else{
                $tpl.find('.ebShareContentItem').css('border-style',opt.btnBorderType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#btnSocialBorderWidth').on('change', function () {
            updateInfElTpl();
            
            opt.btnBorderWidth = $(this).val();
            $tpl.find('.ebShareContentItem').css('border-width',opt.btnBorderWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#btnSocialBorderRadius').on('change', function () {
            updateInfElTpl();
            
            opt.btnBorderRadius = $(this).val();
            $tpl.find('.ebShareContentItem').css('border-radius',opt.btnBorderRadius + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#btnSocialTypeFace').change(function(){
            updateInfElTpl();
            opt.fontTypeFace = $(this).val();
            if(opt.fontTypeFace == "None"){
                 $tpl.find('.mcnShareTextContent > a').css('font-family','');
            } else{
                 $tpl.find('.mcnShareTextContent > a').css('font-family',opt.fontTypeFace + ', sans-serif');
            }
           
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#btnSocialWeight').change(function(){
            updateInfElTpl();
            
            opt.fontWeight = $(this).val();
            $tpl.find('.mcnShareTextContent > a').css('font-weight',opt.fontWeight);
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#btnSocialSize').change(function(){
            updateInfElTpl();
            
            opt.fontSize = $(this).val();
            $tpl.find('.mcnShareTextContent > a').css('font-size',opt.fontSize + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#btnSocialLineHeight').change(function(){
            updateInfElTpl();
            var val = $(this).val();
            
            opt.lineHeight = val;
            if (val == 'None'){
                $tpl.find('.mcnShareTextContent > a').css('line-height','normal');
            }else{
                $tpl.find('.mcnShareTextContent > a').css('line-height',opt.lineHeight + '%');
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        $('#btnSocialAlign').change(function(){
            updateInfElTpl();
            var val = $(this).val();
            
            if ( val == 0){
                $tpl.find('.ebShareBlockInner').attr('align','left');
                $tpl.find('.ebShareContentInner').attr('align','left').children('table').css({
                    display: 'inline-table',
                    verticalAlign: 'top'
                });
            } else if( val == 1){
                $tpl.find('.ebShareBlockInner').attr('align','center');
                $tpl.find('.ebShareContentInner').attr('align','center').children('table').css({
                    display: 'inline-table',
                    verticalAlign: 'top'
                });
            } else {
                $tpl.find('.ebShareBlockInner').attr('align','right');
                $tpl.find('.ebShareContentInner').attr('align','right').children('table').css({
                    display: 'inline-table',
                    verticalAlign: 'top'
                });
            }
            opt.align = val;
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#btnSocialWidth').change(function(){
            updateInfElTpl();
            var val = $(this).val();
            
            if ( val == 0){
                if( opt.layout == '0' || opt.layout == '1'){
                    $tpl.find('.ebShareContent').attr('width','0').css('width','0');
                } else {
                    $tpl.find('.ebShareContent').attr('width','auto').css('width','auto');
                }
            } else {
                $tpl.find('.ebShareContent').attr('width','100%').css('width','100%');
            }
            opt.width = val;
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#btnSocialDisplay').change(function(){
            updateInfElTpl();
            var val = $(this).val();
            var displayOld = opt.display;
            var eqIndex = 0;
            
            opt.display = val;
            $tpl.attr('data-json', JSON.stringify( opt ));

            $('.eb-wrap-layout-social').hide();
            if( opt.display == '0' ){
                if (displayOld == '2' || displayOld == '0'){
                    eqIndex = opt.layout;
                } else {
                    if (opt.layout == '1'){
                        eqIndex = 2;
                    } else {
                        eqIndex = 1;
                    }
                }
                $('.eb-wrap-layout-social.iconOnly').show().find('li').eq(eqIndex).trigger('click');
            } else if( opt.display == '1' ){
                if (opt.layout == '2' || opt.layout == '3'){
                    eqIndex = 1;
                }
                $('.eb-wrap-layout-social.textOnly').show().find('li').eq(eqIndex).trigger('click');
            } else {
                if (displayOld == '2' || displayOld == '0'){
                    eqIndex = opt.layout;
                } else {
                    if (opt.layout == '1'){
                        eqIndex = 2;
                    } else {
                        eqIndex = 1;
                    }
                }
                $('.eb-wrap-layout-social.iconAndText').show().find('li').eq(eqIndex).trigger('click');
            }
        });
        $('.eb-social-style-icon li').on('click', function(){
            updateInfElTpl();
            var index = $(this).index();
            var $li = $(this);
            $li.addClass('selected').siblings('li').removeClass('selected');
            var colors = ['black','black_border','border','color','gray','white'];
            
            
            $tpl.find('.mcnShareIconContent > a').each(function(i){
                var src = $(this).find('img').attr('src');
				src = src.split('/'+colors[opt.styleIcon]+'/').join('/'+colors[index]+'/');
                $(this).find('img').attr('src', src);
            });
            
            opt.styleIcon = index;
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        /*$('#eb-fb-link').on('keyup',function(){
            updateInfElTpl();
            var val = $(this).val();
            $tpl.find('.mcnShareIconContent:eq(0), .mcnShareTextContent:eq(0)').find('a').attr('href',val);
        });
        $('#eb-tw-link').on('keyup',function(){
            updateInfElTpl();
            var val = $(this).val();
            $tpl.find('.mcnShareIconContent:eq(1), .mcnShareTextContent:eq(1)').find('a').attr('href',val);
        });
        $('#eb-in-link').on('keyup',function(){
            updateInfElTpl();
            var val = $(this).val();
            $tpl.find('.mcnShareIconContent:eq(2), .mcnShareTextContent:eq(2)').find('a').attr('href',val);
        });
        $('#eb-gg-link').on('keyup',function(){
            updateInfElTpl();
            var val = $(this).val();
            $tpl.find('.mcnShareIconContent:eq(3), .mcnShareTextContent:eq(3)').find('a').attr('href',val);
        });
        
        $('#eb-check-fb').on('click', function(){
            updateInfElTpl();
            var val = $(this).is(':checked');
                
            if (val){
                $tpl.find('.ebShareContentItemContainer > table:eq(0)').show();
                opt.lnk1 = 1;
            } else {
                $tpl.find('.ebShareContentItemContainer > table:eq(0)').hide();
                opt.lnk1 = 0;
            }
            
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#eb-check-tw').on('click', function(){
            updateInfElTpl();
            var val = $(this).is(':checked');
                
            if (val){
                $tpl.find('.ebShareContentItemContainer > table:eq(1)').show();
                opt.lnk2 = 1;
            } else {
                $tpl.find('.ebShareContentItemContainer > table:eq(1)').hide();
                opt.lnk2 = 0;
            }
            
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#eb-check-in').on('click', function(){
            updateInfElTpl();
            var val = $(this).is(':checked');
                
            if (val){
                $tpl.find('.ebShareContentItemContainer > table:eq(2)').show();
                opt.lnk3 = 1;
            } else {
                $tpl.find('.ebShareContentItemContainer > table:eq(2)').hide();
                opt.lnk3 = 0;
            }
            
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#eb-check-gg').on('click', function(){
            updateInfElTpl();
            var val = $(this).is(':checked');
                
            if (val){
                $tpl.find('.ebShareContentItemContainer > table:eq(3)').show();
                opt.lnk4 = 1;
            } else {
                $tpl.find('.ebShareContentItemContainer > table:eq(3)').hide();
                opt.lnk4 = 0;
            }
            
            $tpl.attr('data-json', JSON.stringify( opt ));
        });*/
        
        $('#h1ShadowX').on('change', function () {
            var $tpl = $('#bodyTable');
            var opt = $tpl.data('json');
            
            opt.h1ShadowX = $(this).val();
            var h1Shadow = opt.h1ShadowX + 'px ' + opt.h1ShadowY + 'px ' + opt.h1ShadowBlur + 'px ' + opt.h1ShadowColor;
            $('.eb-h1> span').css('text-shadow',h1Shadow);
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#h1ShadowY').on('change', function () {
            var $tpl = $('#bodyTable');
            var opt = $tpl.data('json');
            
            opt.h1ShadowY = $(this).val();
            var h1Shadow = opt.h1ShadowX + 'px ' + opt.h1ShadowY + 'px ' + opt.h1ShadowBlur + 'px ' + opt.h1ShadowColor;
            $('.eb-h1> span').css('text-shadow',h1Shadow);
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#h1ShadowBlur').on('change', function () {
            var $tpl = $('#bodyTable');
            var opt = $tpl.data('json');
            
            opt.h1ShadowBlur = $(this).val();
            var h1Shadow = opt.h1ShadowX + 'px ' + opt.h1ShadowY + 'px ' + opt.h1ShadowBlur + 'px ' + opt.h1ShadowColor;
            $('.eb-h1> span').css('text-shadow',h1Shadow);
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#h2ShadowX').on('change', function () {
            var $tpl = $('#bodyTable');
            var opt = $tpl.data('json');
            
            opt.h2ShadowX = $(this).val();
            var h2Shadow = opt.h2ShadowX + 'px ' + opt.h2ShadowY + 'px ' + opt.h2ShadowBlur + 'px ' + opt.h2ShadowColor;
            $('.eb-h2> span').css('text-shadow',h2Shadow);
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#h2ShadowY').on('change', function () {
            var $tpl = $('#bodyTable');
            var opt = $tpl.data('json');
            
            opt.h2ShadowY = $(this).val();
            var h2Shadow = opt.h2ShadowX + 'px ' + opt.h2ShadowY + 'px ' + opt.h2ShadowBlur + 'px ' + opt.h2ShadowColor;
            $('.eb-h2> span').css('text-shadow',h2Shadow);
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#h2ShadowBlur').on('change', function () {
            var $tpl = $('#bodyTable');
            var opt = $tpl.data('json');
            
            opt.h2ShadowBlur = $(this).val();
            var h2Shadow = opt.h2ShadowX + 'px ' + opt.h2ShadowY + 'px ' + opt.h2ShadowBlur + 'px ' + opt.h2ShadowColor;
            $('.eb-h2> span').css('text-shadow',h2Shadow);
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        /*Preheader*/
        $('#preheaderBorderTopType').change(function(){
            var $tpl = $('#tpl-preheader');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.borderTopType = val;
            if (val == 'None'){
                $tpl.css('border-top-style','');
            } else{
                $tpl.css('border-top-style',opt.borderTopType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#preheaderBorderTopWidth').on('change', function () {
            var $tpl = $('#tpl-preheader');
            var opt = $tpl.data('json');
            
            opt.borderTopWidth = $(this).val();
            $tpl.css('border-top-width',opt.borderTopWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#preheaderBorderBottomType').change(function(){
            var $tpl = $('#tpl-preheader');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.borderBottomType = val;
            if (val == 'None'){
                $tpl.css('border-bottom-style','');
            } else{
                $tpl.css('border-bottom-style',opt.borderBottomType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#preheaderBorderBottomWidth').on('change', function () {
            var $tpl = $('#tpl-preheader');
            var opt = $tpl.data('json');
            
            opt.borderBottomWidth = $(this).val();
            $tpl.css('border-bottom-width',opt.borderBottomWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#preheaderTypeFace').change(function(){
            var $tpl = $('#tpl-preheader');
            var opt = $tpl.data('json');
            
            opt.fontTypeFace = $(this).val();
            $tpl.css('font-family',opt.fontTypeFace + ', sans-serif');
            page.updateInlineCss('preheader');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#preheaderWeight').change(function(){
            var $tpl = $('#tpl-preheader');
            var opt = $tpl.data('json');
            
            opt.fontWeight = $(this).val();
            $tpl.css('font-weight',opt.fontWeight);
            page.updateInlineCss('preheader');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#preheaderSize').change(function(){
            var $tpl = $('#tpl-preheader');
            var opt = $tpl.data('json');
            
            opt.fontSize = $(this).val();
            $tpl.css('font-size',opt.fontSize + 'px');
            page.updateInlineCss('preheader');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#preheaderLineHeight').change(function(){
            var $tpl = $('#tpl-preheader');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.lineHeight = val;
			/*REMOVE JS CODE h1-h4*/
            /*if (val == 'None'){
                $tpl.css('line-height','normal');
            }else{
                $tpl.css('line-height',opt.lineHeight + '%');
            }*/
            page.updateInlineCss('preheader');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#preheaderAlign li').on('click', function(){
            var $tpl = $('#tpl-preheader');
            var opt = $tpl.data('json');
            var $li = $(this);
            var index = $li.index();
            $li.addClass('selected').siblings('li').removeClass('selected');
            opt.textAlign = index;
            if (index == 0){
                $tpl.css('text-align','left');
            } else if(index == 1){
                $tpl.css('text-align','center');
            } else if (index == 2){
                $tpl.css('text-align','right');
            }
            page.updateInlineCss('preheader');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        $('#preheaderLinkWeight').change(function(){
            var $tpl = $('#tpl-preheader');
            var opt = $tpl.data('json');
            
            opt.linkWeight = $(this).val();
            page.updateInlineCss('preheader');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#preheaderLinkDecoration').change(function(){
            var $tpl = $('#tpl-preheader');
            var opt = $tpl.data('json');
            opt.linkDecoration = $(this).val();
            page.updateInlineCss('preheader');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        /*Header box*/
        $('#headerBorderTopType').change(function(){
            var $tpl = $('#tpl-header');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.borderTopType = val;
            if (val == 'None'){
                $tpl.css('border-top-style','');
            } else{
                $tpl.css('border-top-style',opt.borderTopType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#headerBorderTopWidth').on('change', function () {
            var $tpl = $('#tpl-header');
            var opt = $tpl.data('json');
            
            opt.borderTopWidth = $(this).val();
            $tpl.css('border-top-width',opt.borderTopWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#headerBorderBottomType').change(function(){
            var $tpl = $('#tpl-header');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.borderBottomType = val;
            if (val == 'None'){
                $tpl.css('border-bottom-style','');
            } else{
                $tpl.css('border-bottom-style',opt.borderBottomType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#headerBorderBottomWidth').on('change', function () {
            var $tpl = $('#tpl-header');
            var opt = $tpl.data('json');
            
            opt.borderBottomWidth = $(this).val();
            $tpl.css('border-bottom-width',opt.borderBottomWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#headerTypeFace').change(function(){
            var $tpl = $('#tpl-header');
            var opt = $tpl.data('json');
            
            opt.fontTypeFace = $(this).val();
            $tpl.css('font-family',opt.fontTypeFace + ', sans-serif');
            page.updateInlineCss('header');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#headerWeight').change(function(){
            var $tpl = $('#tpl-header');
            var opt = $tpl.data('json');
            
            opt.fontWeight = $(this).val();
            $tpl.css('font-weight',opt.fontWeight);
            page.updateInlineCss('header');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#headerSize').change(function(){
            var $tpl = $('#tpl-header');
            var opt = $tpl.data('json');
            
            opt.fontSize = $(this).val();
            $tpl.css('font-size',opt.fontSize + 'px');
            page.updateInlineCss('header');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#headerLineHeight').change(function(){
            var $tpl = $('#tpl-header');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.lineHeight = val;
			/*REMOVE JS CODE h1-h4*/
            /*if (val == 'None'){
                $tpl.css('line-height','normal');
            }else{
                $tpl.css('line-height',opt.lineHeight + '%');
            }*/
            page.updateInlineCss('header');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#headerAlign li').on('click', function(){
            var $tpl = $('#tpl-header');
            var opt = $tpl.data('json');
            var $li = $(this);
            var index = $li.index();
            $li.addClass('selected').siblings('li').removeClass('selected');
            opt.textAlign = index;
            if (index == 0){
                $tpl.css('text-align','left');
            } else if(index == 1){
                $tpl.css('text-align','center');
            } else if (index == 2){
                $tpl.css('text-align','right');
            }
            page.updateInlineCss('header');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        $('#headerLinkWeight').change(function(){
            var $tpl = $('#tpl-header');
            var opt = $tpl.data('json');
            
            opt.linkWeight = $(this).val();
            page.updateInlineCss('header');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#headerLinkDecoration').change(function(){
            var $tpl = $('#tpl-header');
            var opt = $tpl.data('json');
            opt.linkDecoration = $(this).val();
            page.updateInlineCss('header');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        /*Body box*/
        $('#bodyBorderTopType').change(function(){
            var $tpl = $('#tpl-body');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.borderTopType = val;
            if (val == 'None'){
                $tpl.css('border-top-style','');
            } else{
                $tpl.css('border-top-style',opt.borderTopType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#bodyBorderTopWidth').on('change', function () {
            var $tpl = $('#tpl-body');
            var opt = $tpl.data('json');
            
            opt.borderTopWidth = $(this).val();
            $tpl.css('border-top-width',opt.borderTopWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#bodyBorderBottomType').change(function(){
            var $tpl = $('#tpl-body');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.borderBottomType = val;
            if (val == 'None'){
                $tpl.css('border-bottom-style','');
            } else{
                $tpl.css('border-bottom-style',opt.borderBottomType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#bodyBorderBottomWidth').on('change', function () {
            var $tpl = $('#tpl-body');
            var opt = $tpl.data('json');
            
            opt.borderBottomWidth = $(this).val();
            $tpl.css('border-bottom-width',opt.borderBottomWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#bodyTypeFace').change(function(){
            var $tpl = $('#tpl-body');
            var opt = $tpl.data('json');
            
            opt.fontTypeFace = $(this).val();
            $tpl.css('font-family',opt.fontTypeFace + ', sans-serif');
            page.updateInlineCss('body');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#bodyWeight').change(function(){
            var $tpl = $('#tpl-body');
            var opt = $tpl.data('json');
            
            opt.fontWeight = $(this).val();
            $tpl.css('font-weight',opt.fontWeight);
            page.updateInlineCss('body');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#bodySize').change(function(){
            var $tpl = $('#tpl-body');
            var opt = $tpl.data('json');
            
            opt.fontSize = $(this).val();
            $tpl.css('font-size',opt.fontSize + 'px');
            page.updateInlineCss('body');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#bodyLineHeight').change(function(){
            var $tpl = $('#tpl-body');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.lineHeight = val;
			/*REMOVE JS CODE h1-h4*/
            /*if (val == 'None'){
                $tpl.css('line-height','normal');
            }else{
                $tpl.css('line-height',opt.lineHeight + '%');
            }*/
            page.updateInlineCss('body');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#bodyAlign li').on('click', function(){
            var $tpl = $('#tpl-body');
            var opt = $tpl.data('json');
            var $li = $(this);
            var index = $li.index();
            $li.addClass('selected').siblings('li').removeClass('selected');
            opt.textAlign = index;
            if (index == 0){
                $tpl.css('text-align','left');
            } else if(index == 1){
                $tpl.css('text-align','center');
            } else if (index == 2){
                $tpl.css('text-align','right');
            }
            page.updateInlineCss('body');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        $('#bodyLinkWeight').change(function(){
            var $tpl = $('#tpl-body');
            var opt = $tpl.data('json');
            
            opt.linkWeight = $(this).val();
            page.updateInlineCss('body');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#bodyLinkDecoration').change(function(){
            var $tpl = $('#tpl-body');
            var opt = $tpl.data('json');
            opt.linkDecoration = $(this).val();
            page.updateInlineCss('body');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        /*Column box*/
        $('#columnBorderTopType').change(function(){
            var $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.borderTopType = val;
            if (val == 'None'){
                $tpl.css('border-top-style','');
            } else{
                $tpl.css('border-top-style',opt.borderTopType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#columnBorderTopWidth').on('change', function () {
            var $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            var opt = $tpl.data('json');
            
            opt.borderTopWidth = $(this).val();
            $tpl.css('border-top-width',opt.borderTopWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#columnBorderBottomType').change(function(){
            var $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.borderBottomType = val;
            if (val == 'None'){
                $tpl.css('border-bottom-style','');
            } else{
                $tpl.css('border-bottom-style',opt.borderBottomType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#columnBorderBottomWidth').on('change', function () {
            var $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            var opt = $tpl.data('json');
            
            opt.borderBottomWidth = $(this).val();
            $tpl.css('border-bottom-width',opt.borderBottomWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#columnTypeFace').change(function(){
            var $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            var opt = $tpl.data('json');
            
            opt.fontTypeFace = $(this).val();
            $tpl.css('font-family',opt.fontTypeFace + ', sans-serif');
            page.updateInlineCss('columns');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#columnWeight').change(function(){
            var $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            var opt = $tpl.data('json');
            
            opt.fontWeight = $(this).val();
            $tpl.css('font-weight',opt.fontWeight);
            page.updateInlineCss('columns');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#columnSize').change(function(){
            var $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            var opt = $tpl.data('json');
            
            opt.fontSize = $(this).val();
            $tpl.css('font-size',opt.fontSize + 'px');
            page.updateInlineCss('columns');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#columnLineHeight').change(function(){
            var $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.lineHeight = val;
			/*REMOVE JS CODE h1-h4*/
            /*if (val == 'None'){
                $tpl.css('line-height','normal');
            }else{
                $tpl.css('line-height',opt.lineHeight + '%');
            }*/
            page.updateInlineCss('columns');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#columnAlign li').on('click', function(){
            var $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            var opt = $tpl.data('json');
            var $li = $(this);
            var index = $li.index();
            $li.addClass('selected').siblings('li').removeClass('selected');
            opt.textAlign = index;
            if (index == 0){
                $tpl.css('text-align','left');
            } else if(index == 1){
                $tpl.css('text-align','center');
            } else if (index == 2){
                $tpl.css('text-align','right');
            }
            page.updateInlineCss('columns');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        $('#columnLinkWeight').change(function(){
            var $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            var opt = $tpl.data('json');
            
            opt.linkWeight = $(this).val();
            page.updateInlineCss('columns');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#columnLinkDecoration').change(function(){
            var $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            var opt = $tpl.data('json');
            opt.linkDecoration = $(this).val();
            page.updateInlineCss('columns');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
		/*Section Bottom*/
        $('#sectionBottomBorderTopType').change(function(){
            var $tpl = $('#tpl-section-bottom');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.borderTopType = val;
            if (val == 'None'){
                $tpl.css('border-top-style','');
            } else{
                $tpl.css('border-top-style',opt.borderTopType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#sectionBottomBorderTopWidth').on('change', function () {
            var $tpl = $('#tpl-section-bottom');
            var opt = $tpl.data('json');
            
            opt.borderTopWidth = $(this).val();
            $tpl.css('border-top-width',opt.borderTopWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#sectionBottomBorderBottomType').change(function(){
            var $tpl = $('#tpl-section-bottom');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.borderBottomType = val;
            if (val == 'None'){
                $tpl.css('border-bottom-style','');
            } else{
                $tpl.css('border-bottom-style',opt.borderBottomType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#sectionBottomBorderBottomWidth').on('change', function () {
            var $tpl = $('#tpl-section-bottom');
            var opt = $tpl.data('json');
            
            opt.borderBottomWidth = $(this).val();
            $tpl.css('border-bottom-width',opt.borderBottomWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#sectionBottomTypeFace').change(function(){
            var $tpl = $('#tpl-section-bottom');
            var opt = $tpl.data('json');
            
            opt.fontTypeFace = $(this).val();
            $tpl.css('font-family',opt.fontTypeFace + ', sans-serif');
            page.updateInlineCss('sectionBottom');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#sectionBottomWeight').change(function(){
            var $tpl = $('#tpl-section-bottom');
            var opt = $tpl.data('json');
            
            opt.fontWeight = $(this).val();
            $tpl.css('font-weight',opt.fontWeight);
            page.updateInlineCss('sectionBottom');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#sectionBottomSize').change(function(){
            var $tpl = $('#tpl-section-bottom');
            var opt = $tpl.data('json');
            
            opt.fontSize = $(this).val();
            $tpl.css('font-size',opt.fontSize + 'px');
            page.updateInlineCss('sectionBottom');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#sectionBottomLineHeight').change(function(){
            var $tpl = $('#tpl-section-bottom');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.lineHeight = val;
			/*REMOVE JS CODE h1-h4*/
            /*if (val == 'None'){
                $tpl.css('line-height','normal');
            }else{
                $tpl.css('line-height',opt.lineHeight + '%');
            }*/
            page.updateInlineCss('sectionBottom');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#sectionBottomAlign li').on('click', function(){
            var $tpl = $('#tpl-section-bottom');
            var opt = $tpl.data('json');
            var $li = $(this);
            var index = $li.index();
            $li.addClass('selected').siblings('li').removeClass('selected');
            opt.textAlign = index;
            if (index == 0){
                $tpl.css('text-align','left');
            } else if(index == 1){
                $tpl.css('text-align','center');
            } else if (index == 2){
                $tpl.css('text-align','right');
            }
            page.updateInlineCss('sectionBottom');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        $('#sectionBottomLinkWeight').change(function(){
            var $tpl = $('#tpl-section-bottom');
            var opt = $tpl.data('json');
            
            opt.linkWeight = $(this).val();
            page.updateInlineCss('sectionBottom');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#sectionBottomLinkDecoration').change(function(){
            var $tpl = $('#tpl-section-bottom');
            var opt = $tpl.data('json');
            opt.linkDecoration = $(this).val();
            page.updateInlineCss('sectionBottom');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
		
        /*Footer box*/
        $('#footerBorderTopType').change(function(){
            var $tpl = $('#tpl-footer');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.borderTopType = val;
            if (val == 'None'){
                $tpl.css('border-top-style','');
            } else{
                $tpl.css('border-top-style',opt.borderTopType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#footerBorderTopWidth').on('change', function () {
            var $tpl = $('#tpl-footer');
            var opt = $tpl.data('json');
            
            opt.borderTopWidth = $(this).val();
            $tpl.css('border-top-width',opt.borderTopWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#footerBorderBottomType').change(function(){
            var $tpl = $('#tpl-footer');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.borderBottomType = val;
            if (val == 'None'){
                $tpl.css('border-bottom-style','');
            } else{
                $tpl.css('border-bottom-style',opt.borderBottomType.toLowerCase());
            }
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#footerBorderBottomWidth').on('change', function () {
            var $tpl = $('#tpl-footer');
            var opt = $tpl.data('json');
            
            opt.borderBottomWidth = $(this).val();
            $tpl.css('border-bottom-width',opt.borderBottomWidth + 'px');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#footerTypeFace').change(function(){
            var $tpl = $('#tpl-footer');
            var opt = $tpl.data('json');
            
            opt.fontTypeFace = $(this).val();
            $tpl.css('font-family',opt.fontTypeFace + ', sans-serif');
            page.updateInlineCss('footer');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#footerWeight').change(function(){
            var $tpl = $('#tpl-footer');
            var opt = $tpl.data('json');
            
            opt.fontWeight = $(this).val();
            $tpl.css('font-weight',opt.fontWeight);
            page.updateInlineCss('footer');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#footerSize').change(function(){
            var $tpl = $('#tpl-footer');
            var opt = $tpl.data('json');
            
            opt.fontSize = $(this).val();
            $tpl.css('font-size',opt.fontSize + 'px');
            page.updateInlineCss('footer');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#footerLineHeight').change(function(){
            var $tpl = $('#tpl-footer');
            var opt = $tpl.data('json');
            var val = $(this).val();
            
            opt.lineHeight = val;
			/*REMOVE JS CODE h1-h4*/
            /*if (val == 'None'){
                $tpl.css('line-height','normal');
            }else{
                $tpl.css('line-height',opt.lineHeight + '%');
            }*/
            page.updateInlineCss('footer');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#footerAlign li').on('click', function(){
            var $tpl = $('#tpl-footer');
            var opt = $tpl.data('json');
            var $li = $(this);
            var index = $li.index();
            $li.addClass('selected').siblings('li').removeClass('selected');
            opt.textAlign = index;
            if (index == 0){
                $tpl.css('text-align','left');
            } else if(index == 1){
                $tpl.css('text-align','center');
            } else if (index == 2){
                $tpl.css('text-align','right');
            }
            page.updateInlineCss('footer');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        
        $('#footerLinkWeight').change(function(){
            var $tpl = $('#tpl-footer');
            var opt = $tpl.data('json');
            
            opt.linkWeight = $(this).val();
            page.updateInlineCss('footer');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
        $('#footerLinkDecoration').change(function(){
            var $tpl = $('#tpl-footer');
            var opt = $tpl.data('json');
            opt.linkDecoration = $(this).val();
            page.updateInlineCss('footer');
            $tpl.attr('data-json', JSON.stringify( opt ));
        });
    },
    elementsClone: function($btn){
      var $block = $btn.parents('.tpl-block');
      $block.after($block.clone());
    },
    updateColorElTpl: function(el, hex){
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        var id = $(el).attr('id');
        
        if( id == 'boxTextColor' ){
            opt.color = '#' + hex;
            $tpl.find('.ebTextContent').css('color', opt.color);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if (id == 'boxTextBackground'){
            opt.boxesBackgroundColor = '#' + hex;
            $tpl.find('.ebTextBlockInner').css('background-color', opt.boxesBackgroundColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'boxTextBorderColor'){
            opt.boxesBorderColor = '#' + hex;
            $tpl.find('.ebTextContentContainer .ebTextContent').css('border-color', opt.boxesBorderColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'dividerBackgroundColor'){
            opt.backgroundColor = '#' + hex;
            $tpl.find('.ebDividerBlock').css('background-color', opt.backgroundColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'dividerBorderColor'){
            opt.borderColor = '#' + hex;
            $tpl.find('.ebDividerContent').css('border-color', opt.borderColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'buttonBackground' ){
            opt.backgroundColor = '#' + hex;
            $tpl.find('.ebButtonContentContainer').css('background-color', opt.backgroundColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'buttonBorderColor' ){
            opt.borderColor = '#' + hex;
            $tpl.find('.ebButtonContentContainer').css('border-color', opt.borderColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'buttonTextColor' ){
            opt.color = '#' + hex;
            $tpl.find('.ebButton').css('color', opt.color);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if (id == 'cardBackground'){
            opt.backgroundColor = '#' + hex;
            $tpl.find('.ebImageBlock').css('background-color', opt.backgroundColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if (id == 'cardBorderColor'){
            opt.borderColor = '#' + hex;
            $tpl.find('.ebImageBlock').css('border-color', opt.borderColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        }  else if (id == 'videoBackground'){
            opt.backgroundColor = '#' + hex;
            $tpl.find('.ebImageBlock').css('background-color', opt.backgroundColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if (id == 'videoBorderColor'){
            opt.borderColor = '#' + hex;
            $tpl.find('.ebImageBlock').css('border-color', opt.borderColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if (id == 'videoTextColor'){
            opt.color = '#' + hex;
            $tpl.find('.ebTextContent').css('color', opt.color);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if (id == 'captionTextColor'){
            opt.color = '#' + hex;
            $tpl.find('.ebTextContent').css('color', opt.color);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'pageBackground'){
            $tpl = $('#bodyTable');
            opt = $tpl.data('json');
            opt.backgroundColor = '#' + hex;
            $tpl.css('backgroundColor', opt.backgroundColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if( id == 'pageBorderColor'){
            $tpl = $('#bodyTable');
            opt = $tpl.data('json');
            opt.borderTopColor = '#' + hex;
            $tpl.css('borderTopColor', opt.borderTopColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if( id == 'boxBorderColor'){
            $tpl = $('#bodyTable');
            opt = $tpl.data('json');
            opt.boxBorderColor = '#' + hex;
            $('#templateContainerWrap').css('borderColor', opt.boxBorderColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if (id == 'containerSocialBackground'){
            opt.containerBackground = '#' + hex;
            $tpl.find('.ebShareContent').css('background-color', opt.containerBackground);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if (id == 'containerSocialBorderColor'){
            opt.containerBorderColor = '#' + hex;
            $tpl.find('.ebShareContent').css('border-color', opt.containerBorderColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if (id == 'btnSocialBackground'){
            opt.btnBackground = '#' + hex;
            $tpl.find('.ebShareContentItem').css('background-color', opt.btnBackground);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if (id == 'btnSocialBorderColor'){
            opt.btnBorderColor = '#' + hex;
            $tpl.find('.ebShareContentItem').css('border-color', opt.btnBorderColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if (id == 'btnSocialColor'){
            opt.color = '#' + hex;
            $tpl.find('.mcnShareTextContent > a').css('color', opt.color);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if (id == 'h1Color'){
            $tpl = $('#bodyTable');
            opt = $tpl.data('json');
            opt.h1Color = '#' + hex;
            $('.eb-h1 > span').css('color', opt.h1Color);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if (id == 'h2Color'){
            $tpl = $('#bodyTable');
            opt = $tpl.data('json');
            opt.h2Color = '#' + hex;
            $('.eb-h2 > span').css('color', opt.h2Color);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'h1ShadowColor'){
            $tpl = $('#bodyTable');
            opt = $tpl.data('json');
            opt.h1ShadowColor = '#' + hex;
            var h1Shadow = opt.h1ShadowX + 'px ' + opt.h1ShadowY + 'px ' + opt.h1ShadowBlur + 'px ' + opt.h1ShadowColor;
            $('.eb-h1> span').css('text-shadow',h1Shadow);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'h2ShadowColor'){
            $tpl = $('#bodyTable');
            opt = $tpl.data('json');
            opt.h2ShadowColor = '#' + hex;
            var h2Shadow = opt.h2ShadowX + 'px ' + opt.h2ShadowY + 'px ' + opt.h2ShadowBlur + 'px ' + opt.h2ShadowColor;
            $('.eb-h2> span').css('text-shadow',h2Shadow);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'preheaderBackground'){
            $tpl = $('#tpl-preheader');
            opt = $tpl.data('json');
            opt.backgroundColor = '#' + hex;
            $tpl.css('background-color', opt.backgroundColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'preheaderBorderTopColor'){
            $tpl = $('#tpl-preheader');
            opt = $tpl.data('json');
            opt.borderTopColor = '#' + hex;
            $tpl.css('border-top-color', opt.borderTopColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'preheaderBorderBottomColor'){
            $tpl = $('#tpl-preheader');
            opt = $tpl.data('json');
            opt.borderBottomColor = '#' + hex;
            $tpl.css('border-bottom-color', opt.borderBottomColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'preheaderColor'){
            $tpl = $('#tpl-preheader');
            opt = $tpl.data('json');
            opt.color = '#' + hex;
            $tpl.css('color', opt.color);
            page.updateInlineCss('preheader');
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'preheaderLinkColor'){
            $tpl = $('#tpl-preheader');
            opt = $tpl.data('json');
            opt.linkColor = '#' + hex;
            page.updateInlineCss('preheader');
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'headerBackground'){
            $tpl = $('#tpl-header');
            opt = $tpl.data('json');
            opt.backgroundColor = '#' + hex;
            $tpl.css('background-color', opt.backgroundColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'headerBorderTopColor'){
            $tpl = $('#tpl-header');
            opt = $tpl.data('json');
            opt.borderTopColor = '#' + hex;
            $tpl.css('border-top-color', opt.borderTopColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'headerBorderBottomColor'){
            $tpl = $('#tpl-header');
            opt = $tpl.data('json');
            opt.borderBottomColor = '#' + hex;
            $tpl.css('border-bottom-color', opt.borderBottomColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'headerColor'){
            $tpl = $('#tpl-header');
            opt = $tpl.data('json');
            opt.color = '#' + hex;
            $tpl.css('color', opt.color);
            page.updateInlineCss('header');
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'headerLinkColor'){
            $tpl = $('#tpl-header');
            opt = $tpl.data('json');
            opt.linkColor = '#' + hex;
            page.updateInlineCss('header');
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'bodyBackground'){
            $tpl = $('#tpl-body');
            opt = $tpl.data('json');
            opt.backgroundColor = '#' + hex;
			if( $('#template-right-sidebar, #template-left-sidebar').length ){
				$('#template-right-sidebar, #template-left-sidebar').children('.column-wrapper').find('td:first').css('background-color', opt.backgroundColor);
			}
            $tpl.css('background-color', opt.backgroundColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'bodyBorderTopColor'){
            $tpl = $('#tpl-body');
            opt = $tpl.data('json');
            opt.borderTopColor = '#' + hex;
            $tpl.css('border-top-color', opt.borderTopColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'bodyBorderBottomColor'){
            $tpl = $('#tpl-body');
            opt = $tpl.data('json');
            opt.borderBottomColor = '#' + hex;
            $tpl.css('border-bottom-color', opt.borderBottomColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'bodyColor'){
            $tpl = $('#tpl-body');
            opt = $tpl.data('json');
            opt.color = '#' + hex;
            $tpl.css('color', opt.color);
            page.updateInlineCss('body');
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'bodyLinkColor'){
            $tpl = $('#tpl-body');
            opt = $tpl.data('json');
            opt.linkColor = '#' + hex;
            page.updateInlineCss('body');
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'columnBackground'){
            $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            opt = $tpl.data('json');
            opt.backgroundColor = '#' + hex;
            $tpl.css('background-color', opt.backgroundColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'columnBorderTopColor'){
            $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            opt = $tpl.data('json');
            opt.borderTopColor = '#' + hex;
            $tpl.css('border-top-color', opt.borderTopColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'columnBorderBottomColor'){
            $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            opt = $tpl.data('json');
            opt.borderBottomColor = '#' + hex;
            $tpl.css('border-bottom-color', opt.borderBottomColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'columnColor'){
            $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            opt = $tpl.data('json');
            opt.color = '#' + hex;
            $tpl.css('color', opt.color);
            page.updateInlineCss('columns');
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'columnLinkColor'){
            $tpl = $('#template-columns, #template-columns-three, #tpl-right-sidebar, #tpl-left-sidebar');
            opt = $tpl.data('json');
            opt.linkColor = '#' + hex;
            page.updateInlineCss('columns');
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'sectionBottomBackground'){
            $tpl = $('#tpl-section-bottom');
            opt = $tpl.data('json');
            opt.backgroundColor = '#' + hex;
            $tpl.css('background-color', opt.backgroundColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'sectionBottomBorderTopColor'){
            $tpl = $('#tpl-section-bottom');
            opt = $tpl.data('json');
            opt.borderTopColor = '#' + hex;
            $tpl.css('border-top-color', opt.borderTopColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'sectionBottomBorderBottomColor'){
            $tpl = $('#tpl-section-bottom');
            opt = $tpl.data('json');
            opt.borderBottomColor = '#' + hex;
            $tpl.css('border-bottom-color', opt.borderBottomColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'sectionBottomColor'){
            $tpl = $('#tpl-section-bottom');
            opt = $tpl.data('json');
            opt.color = '#' + hex;
            $tpl.css('color', opt.color);
            page.updateInlineCss('sectionBottom');
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'sectionBottomLinkColor'){
            $tpl = $('#tpl-section-bottom');
            opt = $tpl.data('json');
            opt.linkColor = '#' + hex;
            page.updateInlineCss('sectionBottom');
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'footerBackground'){
            $tpl = $('#tpl-footer');
            opt = $tpl.data('json');
            opt.backgroundColor = '#' + hex;
            $tpl.css('background-color', opt.backgroundColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'footerBorderTopColor'){
            $tpl = $('#tpl-footer');
            opt = $tpl.data('json');
            opt.borderTopColor = '#' + hex;
            $tpl.css('border-top-color', opt.borderTopColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'footerBorderBottomColor'){
            $tpl = $('#tpl-footer');
            opt = $tpl.data('json');
            opt.borderBottomColor = '#' + hex;
            $tpl.css('border-bottom-color', opt.borderBottomColor);
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'footerColor'){
            $tpl = $('#tpl-footer');
            opt = $tpl.data('json');
            opt.color = '#' + hex;
            $tpl.css('color', opt.color);
            page.updateInlineCss('footer');
            $tpl.attr('data-json', JSON.stringify( opt ));
        } else if ( id == 'footerLinkColor'){
            $tpl = $('#tpl-footer');
            opt = $tpl.data('json');
            opt.linkColor = '#' + hex;
            page.updateInlineCss('footer');
            $tpl.attr('data-json', JSON.stringify( opt ));
        }
    },
    heightBodyTable: function(){
        //$('#bodyTable').css('height',$('.eb-wrap-email-page').height());
		$('.eb-wrap-email-page').height($('body').height() - 50);
    },
    updateColWidth1150: function(){
        var width = $('body').width();
        if ( width < 1151 ){
            $('.wrap-preview-col').css('right', '440px');
            $('.tool-col').width(440);
        } 
    },
    browseImage: function($el, indexImage, urlImage, $tpl, titleImage){
        urlImage = 'https://s3.amazonaws.com/ll-demo-001/media-manager-file-uploads/customers/11295/root/professionalservices.jpg' || urlImage;
        titleImage = 'Name Image';
        var $tpl = $('.tpl-block.tpl-selected') || $tpl;
        var $li = $el.parents('.item-image');
        var $box = $el.parents('.eb-list-image');
        var widthImg = 665;
        var heightImg = 259;
        var maxWidth = widthImg + 'px';
        var $boxImg = $tpl.find('.ebImageContent').eq(indexImage);
        var boxImgWidth = $boxImg.width();
        
        
        
        $li.find('.eb-image-item-icon').attr('src',urlImage);
        
        $li.find('.eb-image-item-title').text(titleImage);
        $li.find('.eb-size-img').show().text(widthImg + ' × '+ heightImg);
        if ( $box.children('li').length == 2 ){
            $li.find('.eb-links-image').html('<li><a href="#" class="lnk-img-edit">Edit</a></li>');
        } else{
           $li.find('.eb-links-image').html('<li><a href="#" class="lnk-img-edit">Edit</a></li><li><a href="#" class="lnk-img-remove">Remove</a></li>');
        }
        if( boxImgWidth < widthImg){
            widthImg = boxImgWidth;
            heightImg = '';
        }
        $boxImg.html('<img style="margin:0; vertical-align:top; max-width: '+maxWidth +'"  width="'+widthImg+'"  class="eb-img-upload" width="500" src="'+urlImage+'"/>')
    },
    removeImage: function($el, indexImage){
        var $tpl = $('.tpl-block.tpl-selected');
        var $box = $el.parents('.eb-list-image');
        var $li = $($el).parents('.item-image');
        var index = null;
        var imgUrl = 'http://financesonline.com/uploads/2015/06/leadliaison.png';
        
        index = $li.index();
        page.uploadImageHtml(index);
        if ( $box.hasClass('eb-list-image-group') ){
            
            $li.remove();
            $tpl.find('.ebImageContentContainer').eq(index).remove();
            page.countImagesGroup();
            page.resetIdSort();
        } else {
            $li.find('.eb-image-item-title').text('Upload an Image');
            $li.find('.eb-size-img').hide().text('');
            $li.find('.eb-image-item-icon').replaceWith('<img src="imgs/imgs_email_builder/img_none.png" class="eb-image-item-icon"/>');
            $li.find('.eb-links-image').html('<li><a href="#" class="lnk-img-browse">Browse</a></li>');
        }
        
    },
    updateWidthImgs: function(tpl){
        var $tpl = tpl || $('.tpl-block.tpl-selected');
        $tpl.find('.ebImageContent').find('img').attr('width', 0);
        $tpl.find('.ebImageContent').each(function(){
            var $box = $(this);
            var $img = $box.find('img').eq(0);
            var maxWidth = 0;
            var boxWidth = 0;
            var widthImg = 0;
            
            $img.attr('width', 0);

            if ($img.length){
                
                maxWidth = parseInt($img.css('max-width'));
                boxWidth = $box.width();
                
                if( boxWidth > maxWidth ){
                    widthImg  = maxWidth;
                } else {
                    widthImg  = boxWidth;
                }
                if ( !$img.parent('.eb-upload-image').length ){
                    $img.attr('width', widthImg);
                } else {
                    $img.attr('width', '');
                }
                
            }
        });
    },
    uploadImageHtml: function(index){
        var $tpl = $('.tpl-block.tpl-selected');
        var html = '<div class="eb-upload-image">'+
                        '<img class="eb-img-upload" src="imgs/imgs_email_builder/img_upload.jpg"/>'+
                        '<p>Drop an Image here</p>'+
                        '<a href="#" class="et-btn-white">Browse</a>'+
                    '</div>';
        $tpl.find('.ebImageContent').eq(index).html(html);

        if ( $tpl.attr('data-type') == 'box-image-caption' || $tpl.attr('data-type') == 'box-image-card' || $tpl.attr('data-type') == 'box-video'){
            page.captionWidthImg();
        }
    },
    addImageHtml: function(url){
        
    },
    addImagesList: function(){
        $('.eb-add-image-list').on('click', function(e){
            e.preventDefault();
            var sortId = $('.eb-list-image-group').children('li').length;
            var html = '<li class="item-image clearfix" datasortid="'+ sortId +'">'+
                            '<a href="javascript:void(0);" class="et-btn-white eb-btn-move-elm"><i class="icn"></i></a>'+
                            '<img src="imgs/imgs_email_builder/img_none.png" class="eb-image-item-icon">'+
                            '<div class="eb-image-item-meta">'+
                                '<strong class="eb-image-item-title">Upload an Image</strong>'+
                                '<ul class="eb-links-image clearfix">'+
                                    '<li>'+
                                        '<a href="#" class="lnk-img-browse">Browse</a>'+
                                    '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</li>';
            $('.eb-list-image-group').append(html);
            var indexImage = $('.eb-list-image-group > li').length - 1;
            page.addWrapImageBox();
            page.uploadImageHtml(indexImage);
            page.countImagesGroup();
            page.updateWidthImgs();
        });
    },
    countImagesGroup: function(){
        var $links = $('.eb-list-image-group .eb-links-image');
        var countImage = $('.eb-list-image-group > li').length;
        var $btn = $('.eb-add-image-list');
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        
        var html = '<li><a href="#" class="lnk-img-remove">Remove</a></li>';
        
        if (countImage > 4){
            $btn.hide();
        } else {
            $btn.show();
        }
        $links.find('.lnk-img-remove').parent().remove();
        if (countImage > 2){
            $links.append(html);
        }
        
        opt.count = countImage;
        $tpl.attr('data-json', JSON.stringify( opt ));
        page.layoutImagesGroup(opt.count);
        page.positionImagesGroup();
    },
    addWrapImageBox: function(){
        var $tpl = $('.tpl-block.tpl-selected');
        var sortId = $tpl.find('.ebImageContentContainer').length;
        var html = '<table datasortid="'+sortId+'" class="ebImageContentContainer" align="left" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td class="ebImageContent" style="padding: 0 9px;" valign="top"></td></tr></tbody></table>';
        
        $tpl.find('.ebImageBlockInner:last').append(html);
    },
    updateWidthGroupColumn: function(el){
        page.positionImagesGroup(false, false, el);
        page.updateWidthImgs(el);
    },
    positionImagesGroup: function(layoutIndex, sortImages, tpl){
        var masGroupHtml = [];
        var $tpl = tpl || $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        var $box = $tpl.find('.ebImageBlockOuter');
        sortImages = sortImages || false;
        if (sortImages){
            var masSortable = [];
            var masGroupHtmlNew = [];
            $('.eb-list-image-group > li').each(function(){
                masSortable.push($(this).attr('datasortid'));
            });
            $tpl.find('.ebImageContentContainer').each(function(i){
                 masGroupHtml.push($(this));
            });
            if ( masGroupHtml.length == masSortable.length ) {
                for(i = 0; i < masSortable.length; i++){
                    masGroupHtmlNew[i] = masGroupHtml[masSortable[i]];
                }
            }
            masGroupHtml = masGroupHtmlNew;
        } else {
            $tpl.find('.ebImageContentContainer').each(function(i){
                 masGroupHtml.push($(this));
            }); 
        }
        if (layoutIndex != false){
            opt.layoutIndex = layoutIndex || 0;
            $tpl.attr('data-json', JSON.stringify( opt ));
            page.startLayoutImagesGroup();
        } 
        var htmlTr = '<tr><td class="ebImageBlockInner" style="padding: 9px;" valign="top"></td></tr>';
        var htmlEnd = '';
        var widthColumnImg = '282px';
        
        if ( $tpl.parents('#template-columns').length ){
            widthColumnImg = '132px';
            page.updateWidthBoxUploadImage($box.find('td').find('.ebImageContent'));
        } else if ( $tpl.parents('#tpl-left-sidebar').length || $tpl.parents('#tpl-right-sidebar').length || $tpl.parents('#template-columns-three').length ){
            widthColumnImg = '82px';
            var widthUploadImg = '62px';
        } else if ( ($tpl.parents('#template-left-sidebar').length && $tpl.parents('#tpl-body').length) || ($tpl.parents('#template-right-sidebar').length && $tpl.parents('#tpl-body').length) ){
            widthColumnImg = '182px';
            page.updateWidthBoxUploadImage($box.find('td').find('.ebImageContent'));
        } else {
            page.updateWidthBoxUploadImage($box.find('td').find('.ebImageContent'));
        }
        
        $box.html('');
        if (opt.layout == 0 && opt.layoutIndex == 0){
            $box.append(htmlTr);
            $box.find('tr:last > td:first')
                    .append(masGroupHtml[0].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','left'))
                    .append(masGroupHtml[1].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','right'));
            $(masGroupHtml[0]).find('.ebImageContent').css('padding','0 0 0 9px');
            $(masGroupHtml[1]).find('.ebImageContent').css('padding','0 9px 0 0');
            if (widthUploadImg){
                page.updateWidthBoxUploadImage($box.find('td').find('.ebImageContent'), widthUploadImg);
            }  
        } else if ( opt.layout == 0 && opt.layoutIndex == 1 ){
            $box.append(htmlTr);
            $box.find('tr:last > td:first').append(masGroupHtml[0].css('width','100%').attr('width','100%').attr('align','left'));
            $box.append(htmlTr);
            $box.find('tr:last > td:first').append(masGroupHtml[1].css('width','100%').attr('width','100%').attr('align','left'));
            $(masGroupHtml[0]).find('.ebImageContent').css('padding','0 9px');
            $(masGroupHtml[1]).find('.ebImageContent').css('padding','0 9px');
            if (widthUploadImg){
                page.updateWidthBoxUploadImage($box.find('td').find('.ebImageContent'));
            } 
        } else if ( opt.layout == 1 && opt.layoutIndex == 0 ){
            $box.append(htmlTr);
            $box.find('tr:last > td:first').append(masGroupHtml[0].css('width','100%').attr('width','100%').attr('align','left'));
            $(masGroupHtml[0]).find('.ebImageContent').css('padding','0 9px');
            $box.append(htmlTr);
            $box.find('tr:last > td:first')
                    .append(masGroupHtml[1].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','left'))
                    .append(masGroupHtml[2].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','right'));
            $(masGroupHtml[1]).find('.ebImageContent').css('padding','0 0 0 9px');
            $(masGroupHtml[2]).find('.ebImageContent').css('padding','0 9px 0 0');
            
            if (widthUploadImg){
                page.updateWidthBoxUploadImage($(masGroupHtml[0]).find('.ebImageContent'));
                page.updateWidthBoxUploadImage($(masGroupHtml[1]).find('.ebImageContent'), widthUploadImg);
                page.updateWidthBoxUploadImage($(masGroupHtml[2]).find('.ebImageContent'), widthUploadImg);
            }  
            
        } else if ( opt.layout == 1 && opt.layoutIndex == 1 ){
            $box.append(htmlTr);
            $box.find('tr:last > td:first')
                    .append(masGroupHtml[0].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','left'))
                    .append(masGroupHtml[1].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','right'));
            $(masGroupHtml[0]).find('.ebImageContent').css('padding','0 0 0 9px');
            $(masGroupHtml[1]).find('.ebImageContent').css('padding','0 9px 0 0');
            $box.append(htmlTr);
            $box.find('tr:last > td:first').append(masGroupHtml[2].css('width','100%').attr('width','100%').attr('align','left'));
            $(masGroupHtml[2]).find('.ebImageContent').css('padding','0 9px');
            
            if (widthUploadImg){
                page.updateWidthBoxUploadImage($(masGroupHtml[2]).find('.ebImageContent'));
                page.updateWidthBoxUploadImage($(masGroupHtml[0]).find('.ebImageContent'), widthUploadImg);
                page.updateWidthBoxUploadImage($(masGroupHtml[1]).find('.ebImageContent'), widthUploadImg);
            } 
            
        } else if ( opt.layout == 1 && opt.layoutIndex == 2 ){
            $box.append(htmlTr);
            $box.find('tr:last > td:first').append(masGroupHtml[0].css('width','100%').attr('width','100%').attr('align','left'));
            $box.append(htmlTr);
            $box.find('tr:last > td:first').append(masGroupHtml[1].css('width','100%').attr('width','100%').attr('align','left'));
            $box.append(htmlTr);
            $box.find('tr:last > td:first').append(masGroupHtml[2].css('width','100%').attr('width','100%').attr('align','left'));
            $(masGroupHtml[0]).find('.ebImageContent').css('padding','0 9px');
            $(masGroupHtml[1]).find('.ebImageContent').css('padding','0 9px');
            $(masGroupHtml[2]).find('.ebImageContent').css('padding','0 9px');
            if (widthUploadImg){
                page.updateWidthBoxUploadImage($box.find('td').find('.ebImageContent'));
            } 
            
        } else if ( opt.layout == 2 && opt.layoutIndex == 0 ){
            $box.append(htmlTr);
            $box.find('tr:last > td:first')
                    .append(masGroupHtml[0].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','left'))
                    .append(masGroupHtml[1].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','right'));
            $(masGroupHtml[0]).find('.ebImageContent').css('padding','0 0 0 9px');
            $(masGroupHtml[1]).find('.ebImageContent').css('padding','0 9px 0 0');
            $box.append(htmlTr);
            $box.find('tr:last > td:first')
                    .append(masGroupHtml[2].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','left'))
                    .append(masGroupHtml[3].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','right'));
            $(masGroupHtml[2]).find('.ebImageContent').css('padding','0 0 0 9px');
            $(masGroupHtml[3]).find('.ebImageContent').css('padding','0 9px 0 0');
            if (widthUploadImg){
                page.updateWidthBoxUploadImage($box.find('td').find('.ebImageContent'), widthUploadImg);
            } 
        } else if ( opt.layout == 2 && opt.layoutIndex == 1 ){
            $box.append(htmlTr);
            $box.find('tr:last > td:first').append(masGroupHtml[0].css('width','100%').attr('width','100%').attr('align','left'));
            $(masGroupHtml[0]).find('.ebImageContent').css('padding','0 9px');
            $box.append(htmlTr);
            $box.find('tr:last > td:first')
                    .append(masGroupHtml[1].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','left'))
                    .append(masGroupHtml[2].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','right'));
            $(masGroupHtml[1]).find('.ebImageContent').css('padding','0 0 0 9px');
            $(masGroupHtml[2]).find('.ebImageContent').css('padding','0 9px 0 0');
            $box.append(htmlTr);
            $box.find('tr:last > td:first').append(masGroupHtml[3].css('width','100%').attr('width','100%').attr('align','left'));
            $(masGroupHtml[3]).find('.ebImageContent').css('padding','0 9px');
            
            if (widthUploadImg){
                page.updateWidthBoxUploadImage($(masGroupHtml[0]).find('.ebImageContent'));
                page.updateWidthBoxUploadImage($(masGroupHtml[1]).find('.ebImageContent'), widthUploadImg);
                page.updateWidthBoxUploadImage($(masGroupHtml[2]).find('.ebImageContent'), widthUploadImg);
                page.updateWidthBoxUploadImage($(masGroupHtml[3]).find('.ebImageContent'));
            }
        } else if ( opt.layout == 3 && opt.layoutIndex == 0 ){
            $box.append(htmlTr);
            $box.find('tr:last > td:first').append(masGroupHtml[0].css('width','100%').attr('width','100%').attr('align','left'));
            $(masGroupHtml[0]).find('.ebImageContent').css('padding','0 9px');
            $box.append(htmlTr);
            $box.find('tr:last > td:first')
                    .append(masGroupHtml[1].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','left'))
                    .append(masGroupHtml[2].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','right'));
            $(masGroupHtml[1]).find('.ebImageContent').css('padding','0 0 0 9px');
            $(masGroupHtml[2]).find('.ebImageContent').css('padding','0 9px 0 0');
            $box.append(htmlTr);
            $box.find('tr:last > td:first')
                    .append(masGroupHtml[3].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','left'))
                    .append(masGroupHtml[4].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','right'));
            $(masGroupHtml[3]).find('.ebImageContent').css('padding','0 0 0 9px');
            $(masGroupHtml[4]).find('.ebImageContent').css('padding','0 9px 0 0');
            
            if (widthUploadImg){
                page.updateWidthBoxUploadImage($(masGroupHtml[0]).find('.ebImageContent'));
                page.updateWidthBoxUploadImage($(masGroupHtml[1]).find('.ebImageContent'), widthUploadImg);
                page.updateWidthBoxUploadImage($(masGroupHtml[2]).find('.ebImageContent'), widthUploadImg);
                page.updateWidthBoxUploadImage($(masGroupHtml[3]).find('.ebImageContent'), widthUploadImg);
                page.updateWidthBoxUploadImage($(masGroupHtml[4]).find('.ebImageContent'), widthUploadImg);
            }
        } else if ( opt.layout == 3 && opt.layoutIndex == 1){
            $box.append(htmlTr);
            $box.find('tr:last > td:first')
                    .append(masGroupHtml[0].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','left'))
                    .append(masGroupHtml[1].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','right'));
            $(masGroupHtml[0]).find('.ebImageContent').css('padding','0 0 0 9px');
            $(masGroupHtml[1]).find('.ebImageContent').css('padding','0 9px 0 0');
            $box.append(htmlTr);
            $box.find('tr:last > td:first').append(masGroupHtml[2].css('width','100%').attr('width','100%').attr('align','left'));
            $(masGroupHtml[2]).find('.ebImageContent').css('padding','0 9px');
            $box.append(htmlTr);
            $box.find('tr:last > td:first')
                    .append(masGroupHtml[3].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','left'))
                    .append(masGroupHtml[4].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','right'));
            $(masGroupHtml[3]).find('.ebImageContent').css('padding','0 0 0 9px');
            $(masGroupHtml[4]).find('.ebImageContent').css('padding','0 9px 0 0');
            
            if (widthUploadImg){
                page.updateWidthBoxUploadImage($(masGroupHtml[0]).find('.ebImageContent'), widthUploadImg);
                page.updateWidthBoxUploadImage($(masGroupHtml[1]).find('.ebImageContent'), widthUploadImg);
                page.updateWidthBoxUploadImage($(masGroupHtml[2]).find('.ebImageContent'));
                page.updateWidthBoxUploadImage($(masGroupHtml[3]).find('.ebImageContent'), widthUploadImg);
                page.updateWidthBoxUploadImage($(masGroupHtml[4]).find('.ebImageContent'), widthUploadImg);
            }
        } else if ( opt.layout == 3 && opt.layoutIndex == 2 ){
            $box.append(htmlTr);
            $box.find('tr:last > td:first')
                    .append(masGroupHtml[0].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','left'))
                    .append(masGroupHtml[1].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','right'));
            $(masGroupHtml[0]).find('.ebImageContent').css('padding','0 0 0 9px');
            $(masGroupHtml[1]).find('.ebImageContent').css('padding','0 9px 0 0');
            $box.append(htmlTr);
            $box.find('tr:last > td:first')
                    .append(masGroupHtml[2].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','left'))
                    .append(masGroupHtml[3].css('width',widthColumnImg).attr('width',widthColumnImg).attr('align','right'));
            $(masGroupHtml[2]).find('.ebImageContent').css('padding','0 0 0 9px');
            $(masGroupHtml[3]).find('.ebImageContent').css('padding','0 9px 0 0');
            $box.append(htmlTr);
            $box.find('tr:last > td:first').append(masGroupHtml[4].css('width','100%').attr('width','100%').attr('align','left'));
            $(masGroupHtml[4]).find('.ebImageContent').css('padding','0 9px');
            
            if (widthUploadImg){
                page.updateWidthBoxUploadImage($(masGroupHtml[0]).find('.ebImageContent'), widthUploadImg);
                page.updateWidthBoxUploadImage($(masGroupHtml[1]).find('.ebImageContent'), widthUploadImg);
                page.updateWidthBoxUploadImage($(masGroupHtml[2]).find('.ebImageContent'), widthUploadImg);
                page.updateWidthBoxUploadImage($(masGroupHtml[3]).find('.ebImageContent'), widthUploadImg);
                page.updateWidthBoxUploadImage($(masGroupHtml[4]).find('.ebImageContent'));
            }
        }
    },
    startLayoutImagesGroup: function(){
       var $tpl = $('.tpl-block.tpl-selected');
       var opt = $tpl.data('json');
       $('.eb-list-layout li').removeClass('selected').hide();
       $('.eb-list-layout li[data-type="'+opt.layout+'"]').show().eq(opt.layoutIndex).addClass('selected');
    },
    layoutImagesGroup: function(count){
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        if( count == 2){
            opt.layout = 0;
        } else if( count == 3 ){
            opt.layout = 1;
        } else if( count == 4 ){
            opt.layout = 2;
        } else {
            opt.layout = 3;
        }
        $tpl.attr('data-json', JSON.stringify( opt ));
    },
    startCountImgs: function(){
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        var linkRemove = '';
        var urlImage = '';
        
        $('.eb-list-image-group').html('');
        if (opt.count > 2){
            linkRemove = '<li><a href="#" class="lnk-img-remove">Remove</a></li>';
        }
        var html = '';
        for(i = 0; i < opt.count; i++){
            var $img = $tpl.find('.ebImageContent').eq(i).children('img');
            if($img.length){
                urlImage = $img.attr('src');
                html = '<li class="item-image clearfix" datasortid="'+i+'">'+
                            '<a href="javascript:void(0);" class="et-btn-white eb-btn-move-elm"><i class="icn"></i></a>'+
                            '<img src="'+urlImage+'" class="eb-image-item-icon">'+
                            '<div class="eb-image-item-meta">'+
                                '<strong class="eb-image-item-title">Name Image</strong>'+
                                '<ul class="eb-links-image clearfix">'+
                                    '<li>'+
                                        '<a href="#" class="lnk-img-edit">Edit</a>'+
                                    '</li>'+
                                    linkRemove +
                                '</ul>'+
                            '</div>'+
                        '</li>';
            } else{
                urlImage = 'imgs/imgs_email_builder/img_none.png';
                html = '<li class="item-image clearfix" datasortid="'+i+'">'+
                            '<a href="javascript:void(0);" class="et-btn-white eb-btn-move-elm"><i class="icn"></i></a>'+
                            '<img src="'+urlImage+'" class="eb-image-item-icon">'+
                            '<div class="eb-image-item-meta">'+
                                '<strong class="eb-image-item-title">Upload an Image</strong>'+
                                '<ul class="eb-links-image clearfix">'+
                                    '<li>'+
                                        '<a href="#" class="lnk-img-browse">Browse</a>'+
                                    '</li>'+
                                    linkRemove +
                                '</ul>'+
                            '</div>'+
                        '</li>';
            }
            
            $('.eb-list-image-group').append(html);
        }
        var countImage = $('.eb-list-image-group > li').length;
        var $btn = $('.eb-add-image-list');
        if (countImage > 4){
            $btn.hide();
        } else {
            $btn.show();
        }
    },
    startCountImgOne: function(){
        var $tpl = $('.tpl-block.tpl-selected');
        var type = $tpl.attr('data-type');
        var html = '';
        
        if ( $tpl.find('.ebImageContent').children('img').length ){
            html = '<li class="item-image clearfix">'+
                        '<img src="http://financesonline.com/uploads/2015/06/leadliaison.png" class="eb-image-item-icon">'+
                        '<div class="eb-image-item-meta">'+
                            '<strong class="eb-image-item-title">Name Image</strong>'+
                            '<div style="display: block;" class="eb-size-img">500 × 259</div>'+
                            '<ul class="eb-links-image clearfix"><li><a href="#" class="lnk-img-edit">Edit</a></li><li><a href="#" class="lnk-img-remove">Remove</a></li></ul>'+
                        '</div>'+
                    '</li>';
        } else {
            html = '<li class="item-image clearfix">'+
                        '<img src="imgs/imgs_email_builder/img_none.png" class="eb-image-item-icon">'+
                        '<div class="eb-image-item-meta">'+
                            '<strong class="eb-image-item-title">Upload an Image</strong>'+
                            '<div class="eb-size-img"></div>'+
                            '<ul class="eb-links-image clearfix">'+
                                '<li>'+
                                    '<a href="#" class="lnk-img-browse">Browse</a>'+
                                '</li>'+
                            '</ul>'+
                        '</div>'+
                    '</li>';
        }
        if ( type == 'box-image' ){
            $('#eb-box-image').find('.eb-list-image').html('').append(html);
        } else if ( type == 'box-image-card'){
            $('#eb-box-image-card').find('.eb-list-image').html('').append(html);
        } else{
            $('#eb-box-image-caption').find('.eb-list-image').html('').append(html);
        }
        
    },
    sortableImages: function(){
      $('.eb-list-image-group').sortable({
            cursor: 'move',
            handle: '.eb-btn-move-elm',
            tolerance: 'intersect',
            stop: function(event, ui) {
                page.updatePositionImgs();
            }
        }).disableSelection();
    },
    updatePositionImgs: function(){
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        var sortImages = true;
        page.positionImagesGroup(opt.layoutIndex, sortImages);
        page.resetIdSort();
        page.updateWidthImgs();
    },
    resetIdSort: function(){
        var $tpl = $('.tpl-block.tpl-selected');
        $('.eb-list-image-group > li').each(function(i){
            $(this).attr('datasortid', i);
        });
        $tpl.find('.ebImageContentContainer').each(function(i){
            $(this).attr('datasortid', i);
        });
    },
    captionPosition: function(ofNumberSelect){
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        var imgContent = [];
        var textContent = [];
        var $outer = $tpl.find('.ebImageBlockOuter');
        var content = '';
        var content2 = '';
        var ofNumberSelect = ofNumberSelect || false;
        $tpl.find('.ebTextContent').each(function(){
            textContent.push($(this).html());
        });
        $tpl.find('.ebImageCardBlockInner').each(function(){
            imgContent.push($(this).html());
        });
        if( opt.position == 0 ){
            //left
            content = '<tr><td>';
			content += '<table class="ebTableImg" align="right" border="0" cellpadding="0" cellspacing="0" width="69%"><tbody><tr><td class="ebImageCardBlockInner" style="padding: 9px 18px 9px 0;" valign="top">'+imgContent[0]+'</td></tr></tbody></table>';
            content += '<table class="ebTableText" align="left" border="0" cellpadding="0" cellspacing="0" width="31%"><tbody><tr><td class="ebTextContent" style="padding: 9px 0 9px 18px;" valign="top">'+textContent[0]+'</td></tr></tbody></table>';
            content += '</td></tr>';
            if ( opt.number == 1 ){
                content2 = '<tr><td>';
                content2 += '<table class="ebTableText" align="left" border="0" cellpadding="0" cellspacing="0" width="31%"><tbody><tr><td class="ebTextContent" style="padding: 9px 0 9px 18px;" valign="top">'+textContent[1]+'</td></tr></tbody></table>';
                content2 += '<table class="ebTableImg" align="right" border="0" cellpadding="0" cellspacing="0" width="69%"><tbody><tr><td class="ebImageCardBlockInner" style="padding: 9px 18px 9px 0;" valign="top">'+imgContent[1]+'</td></tr></tbody></table>';
                content2 += '</td></tr>';
            }
            
        } else if ( opt.position == 1 ){
            //top
            content = '<tr>';
            content += '<td class="ebTextContent" style="padding: 9px 18px 9px;" valign="top">'+textContent[0]+'</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td class="ebImageCardBlockInner" style="padding: 0 18px 9px;" valign="top">'+imgContent[0]+'</td>';
            content += '</tr>';
            
            if ( opt.number == 1 ){
                content2 = '<tr>';
                content2 += '<td class="ebTextContent" style="padding: 9px 18px 9px;" valign="top">'+textContent[1]+'</td>';
                content2 += '</tr>';
                content2 += '<tr>';
                content2 += '<td class="ebImageCardBlockInner" style="padding: 0 18px 9px;" valign="top">'+imgContent[1]+'</td>';
                content2 += '</tr>';
            }
            
        } else if ( opt.position == 2 ){
            //right
            content = '<tr><td>';
            content += '<table class="ebTableImg" align="left" border="0" cellpadding="0" cellspacing="0" width="69%"><tbody><tr><td class="ebImageCardBlockInner" style="padding: 9px 0 9px 18px;" valign="top">'+imgContent[0]+'</td></tr></tbody></table>';
            content += '<table class="ebTableText" align="right" border="0" cellpadding="0" cellspacing="0" width="31%"><tbody><tr><td class="ebTextContent" style="padding: 9px 18px 9px 0;" valign="top">'+textContent[0]+'</td></tr></tbody></table>';
            content += '</td></tr>';
            
            if ( opt.number == 1 ){
                content2 = '<tr><td>';
                content2 += '<table class="ebTableImg" align="left" border="0" cellpadding="0" cellspacing="0" width="69%"><tbody><tr><td class="ebImageCardBlockInner" style="padding: 9px 0 9px 18px;" valign="top">'+imgContent[1]+'</td></tr></tbody></table>';
                content2 += '<table class="ebTableText" align="right" border="0" cellpadding="0" cellspacing="0" width="31%"><tbody><tr><td class="ebTextContent" style="padding: 9px 18px 9px 0;" valign="top">'+textContent[1]+'</td></tr></tbody></table>';
                content2 += '</td></tr>';
            }
            
        } else if ( opt.position == 3 ){
            //bottom
            content = '<tr>';
            content += '<td class="ebImageCardBlockInner" style="padding: 9px 18px 0;" valign="top">'+imgContent[0]+'</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td class="ebTextContent" style="padding: 9px 18px 9px;" valign="top">'+textContent[0]+'</td>';
            content += '</tr>';
            
            if ( opt.number == 1 ){
                content2 = '<tr>';
                content2 += '<td class="ebImageCardBlockInner" style="padding: 9px 18px 0;" valign="top">'+imgContent[1]+'</td>';
                content2 += '</tr>';
                content2 += '<tr>';
                content2 += '<td class="ebTextContent" style="padding: 9px 18px 9px;" valign="top">'+textContent[1]+'</td>';
                content2 += '</tr>';
            }
        }
        
        $outer.eq(0).html(content);
        if ( opt.number == 1 ){
             $outer.eq(1).html(content2);
        }
        if(ofNumberSelect){
            page.optionsDropdownImage();
        } else {
            page.optionsDropdownImage(true);
        }
        page.updateStyleCaptionImage();
    },
    callCaptionWidthImg: function(){
        $('#bodyTable').find('.tpl-block').each(function(){
            var $tpl = $(this);
            if ( $tpl.attr('data-type') == 'box-image-card' || $tpl.attr('data-type') == 'box-image-caption' || $tpl.attr('data-type') == 'box-video'){
                page.captionWidthImg($tpl);
            }
        });
    },
    captionWidthImg: function(tpl){
        var $tpl = tpl || $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        var $box = '';
        var optPage = $('#bodyTable').data('json');
        var padding = 0;

        ( optPage.boxBorderType != 'None' ) ? padding = optPage.boxBorderWidth : padding = 0;

        var widthColumn_0_1 = 198 - padding + 'px';
        var widthColumn_0_2 = 393 - padding + 'px';
        var widthColumn_1_1 = 291 - padding + 'px';
        var widthColumn_1_2 = 300 - padding + 'px';
        var widthColumn_2_1 = 393 - padding + 'px';
        var widthColumn_2_2 = 198 - padding + 'px';  
        var widthColumn_3_1 = 424 - (padding * 2) + 'px';
        var widthColumn_3_2 = 167 + 'px';
        var widthUploadImg_0 = '100%';
        var widthUploadImg_1 = '100%';
        var widthUploadImg_2 = '100%';
        var widthUploadImg_3 = '100%';
        

        if ( $tpl.parents('#template-columns').length ){
            widthColumn_0_1 = '99px';
            widthColumn_0_2 = '192px';
            widthColumn_1_1 = '141px';
            widthColumn_1_2 = '150px';
            widthColumn_2_1 = '192px';
            widthColumn_2_2 = '99px';      
            widthColumn_3_1 = '208px';
            widthColumn_3_2 = '83px';
            widthUploadImg_2 = '61px';
            widthUploadImg_3 = '45px';
        } else if ( $tpl.parents('#tpl-left-sidebar').length || $tpl.parents('#tpl-right-sidebar').length || $tpl.parents('#template-columns-three').length ){
            widthColumn_0_1 = '91px';
            widthColumn_0_2 = '100px';
            widthColumn_1_1 = '91px';
            widthColumn_1_2 = '100px';
            widthColumn_2_1 = '111px';
            widthColumn_2_2 = '80px';      
            widthColumn_3_1 = '111px';
            widthColumn_3_2 = '80px';
            widthUploadImg_0 = '72px';
            widthUploadImg_1 = '72px';
            widthUploadImg_2 = '52px';
            widthUploadImg_3 = '52px';
        } else if ( ($tpl.parents('#template-left-sidebar').length && $tpl.parents('#tpl-body').length) || ($tpl.parents('#template-right-sidebar').length && $tpl.parents('#tpl-body').length) ){
            widthColumn_0_1 = '125px';
            widthColumn_0_2 = '256px';
            widthColumn_1_1 = '191px';
            widthColumn_1_2 = '200px';
            widthColumn_2_1 = '256px';
            widthColumn_2_2 = '125px';      
            widthColumn_3_1 = '284px';
            widthColumn_3_2 = '98px';
            widthUploadImg_2 = '87px';
            widthUploadImg_3 = '60px';
        }
        
        $tpl.find('.ebImageBlockOuter').each(function(){
            $box = $(this).find('td:first');
            if( opt.position == 0 || opt.position == 2){
                if ( opt.captionWidth == 0 ){
                    $box.find('.ebTableText').attr('width',widthColumn_0_1).css('width',widthColumn_0_1);
                    $box.find('.ebTableImg').attr('width',widthColumn_0_2).css('width',widthColumn_0_2);
                    page.updateWidthBoxUploadImage($box.find('.ebTableImg'), widthUploadImg_0);
                } else if ( opt.captionWidth == 1 ){
                    $box.find('.ebTableText').attr('width',widthColumn_1_1).css('width',widthColumn_1_1);
                    $box.find('.ebTableImg').attr('width',widthColumn_1_2).css('width',widthColumn_1_2);
                    page.updateWidthBoxUploadImage($box.find('.ebTableImg'), widthUploadImg_1);
                } else if ( opt.captionWidth == 2 ){
                    $box.find('.ebTableText').attr('width',widthColumn_2_1).css('width',widthColumn_2_1);
                    $box.find('.ebTableImg').attr('width',widthColumn_2_2).css('width',widthColumn_2_2);
                    page.updateWidthBoxUploadImage($box.find('.ebTableImg'), widthUploadImg_2);
                } else {
                    $box.find('.ebTableText').attr('width',widthColumn_3_1).css('width',widthColumn_3_1);
                    $box.find('.ebTableImg').attr('width',widthColumn_3_2).css('width',widthColumn_3_2);
                    page.updateWidthBoxUploadImage($box.find('.ebTableImg'), widthUploadImg_3);
                }
            } else {
                page.updateWidthBoxUploadImage($(this).find('td').find('.ebImageContent'));
            }
        });
        page.updateWidthImgs();
    },
    updateWidthBoxUploadImage: function($el, width){
        var maxWidth = width || '100%';
        $el.find('.eb-upload-image').css('max-width',maxWidth);
    },
    alignmentImg: function(){
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        var $box = $tpl.find('.ebImageContent');
        if( opt.imgAlignment == 0 ){
            $box.css('text-align','left');
        } else if( opt.imgAlignment == 1 ){
            $box.css('text-align','center');
        }  else {
            $box.css('text-align','right');
        }    
    },
    isImageEdge:function($check){
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        
        if( $check.is(':checked') ){
            opt.margins = 1;
        } else {
            opt.margins = 0;
        }
        $tpl.attr('data-json', JSON.stringify( opt ));
        page.updateImageEdge($check);
        
        if ( $tpl.attr('data-type') == 'box-image-card' || $tpl.attr('data-type') == 'box-image-caption' || $tpl.attr('data-type') == 'box-video'){
            page.captionWidthImg($tpl);
        }
        if ( $tpl.attr('data-type') == 'box-image' ){
            page.updateWidthImgs($tpl);
        }
    },
    updateImageEdge: function($check){
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        if( $check.is(':checked') ){
            if( opt.margins == 0){
                $check.click();
            }    
        } else {
            if( opt.margins == 1){
                $check.click();
            }    
        }
        if ( $check.attr('id') == 'image-edge' ){
            if( opt.margins == 1 ){
                $tpl.find('.ebImageBlockInner').css('padding','0').addClass('ll-image-edge');
                $tpl.find('.ebImageContent').css('padding','0').addClass('ll-image-edge');
            } else {
                $tpl.find('.ebImageBlockInner').css('padding','9px').removeClass('ll-image-edge');
                $tpl.find('.ebImageContent').css('padding','0 9px').removeClass('ll-image-edge');
            }
        } else {
            if( opt.margins == 1 ){
                $tpl.find('.ebImageCardBlockInner').css('padding','0');
            } else {
                if( opt.position == 0 ){
                    $tpl.find('.ebImageCardBlockInner').css('padding', '9px 18px 9px 0');
                } else if( opt.position == 1 ){
                    $tpl.find('.ebImageCardBlockInner').css('padding', '0 18px 9px 18px');
                } else if( opt.position == 2 ){
                    $tpl.find('.ebImageCardBlockInner').css('padding', '9px 0 9px 18px');
                } else if( opt.position == 3 ){
                    $tpl.find('.ebImageCardBlockInner').css('padding', '9px 18px 0');
                }
            }
        }
        
    },
    optionsDropdownImage: function(start){
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        var start = start || false;
        var $tplType = $tpl.attr('data-type');
        
        if( opt.position == 0 || opt.position == 2){
            if ( $tplType == 'box-image-card'){
                $('.caption-width-card-wrap').show();
                $('.image-alignment-card-wrap').hide();
            } else if ( $tplType == 'box-video'){
                $('.caption-width-video-wrap').show();
                $('.image-alignment-video-wrap').hide();
            } else{
                $('.caption-width-caption-wrap').show();
                $('.image-alignment-caption-wrap').hide();
            }
        } else {
            if ( $tplType == 'box-image-card'){
                $('.caption-width-card-wrap').hide();
                $('.image-alignment-card-wrap').show();
            } else if ( $tplType == 'box-video'){
                $('.caption-width-video-wrap').hide();
                $('.image-alignment-video-wrap').show();
            } else{
                $('.caption-width-caption-wrap').hide();
                $('.image-alignment-caption-wrap').show();
            }  
        }
        if (start){
            opt.imgAlignment = 0;
            opt.captionWidth = 0;
        }
        page.alignmentImg();
        page.captionWidthImg();
        if ( $tplType == 'box-image-card' ){
            $('#cardImgAlignment option[value="'+opt.imgAlignment+'"]').attr('selected', true);
            $("#cardImgAlignment").trigger('liszt:updated');
            $('#cardCaptionWidth option[value="'+opt.captionWidth+'"]').attr('selected', true);
            $("#cardCaptionWidth").trigger('liszt:updated');
        } else if ( $tplType == 'box-video' ){
            $('#videoImgAlignment option[value="'+opt.imgAlignment+'"]').attr('selected', true);
            $("#videoImgAlignment").trigger('liszt:updated');
            $('#videoCaptionWidth option[value="'+opt.captionWidth+'"]').attr('selected', true);
            $("#videoCaptionWidth").trigger('liszt:updated');
        }  else {
            $('#captionImgAlignment option[value="'+opt.imgAlignment+'"]').attr('selected', true);
            $("#captionImgAlignment").trigger('liszt:updated');
            $('#captionCaptionWidth option[value="'+opt.captionWidth+'"]').attr('selected', true);
            $("#captionCaptionWidth").trigger('liszt:updated');
        } 
    },
    updateColumnEditorCaption:function(opt){
        var $columnEditor = $('.two-caption-editor');
        if ( opt.number == 0){
            $columnEditor.children('ul').hide();
        } else {
            $columnEditor.children('ul').show();
            page.captionPosition(true);
        }
        $columnEditor.children('ul').find('li').removeClass('selected').eq(0).addClass('selected');
        $columnEditor.find('.eb-caption-column').hide().eq(0).show();
    },
    addColumnCaptionTpl: function(){
        var $tpl = $('.tpl-block.tpl-selected');
        if ( $tpl.find('.ebImageBlock').length == 1 ){
            var html = '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="ebImageBlock">'+
                            '<tbody class="ebImageBlockOuter">'+
                                '<tr>'+
                                    '<td valign="top" class="ebImageCardBlockInner" style="padding: 18px 18px 0;">'+
                                        '<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="ebImageContentContainer">'+
                                            '<tbody>'+
                                                '<tr>'+
                                                    '<td valign="top" class="ebImageContent" style="">'+
                                                        '<div class="eb-upload-image">'+
                                                            '<img class="eb-img-upload" src="imgs/imgs_email_builder/img_upload.jpg"/>'+
                                                            '<p>Drop an Image here</p>'+
                                                            '<a href="#" class="et-btn-white">Browse</a>'+
                                                        '</div>'+
                                                    '</td>'+
                                                '</tr>'+
                                            '</tbody>'+
                                        '</table>'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td valign="top" class="ebTextContent" style="padding: 9px 18px;">'+
                                        'Your text caption goes here'+
                                    '</td>'+
                                '</tr>'+
                            '</tbody>'+
                        '</table>';
            $tpl.find('.tpl-block-content').append(html);
            $tpl.find('.ebTextContent').eq(1).html('Your text caption goes here. You can change the position of the caption and set styles in the block’s settings tab 2.');
            tinymce.get('editor-box-text-caption-2').setContent($tpl.find('.ebTextContent').eq(1).html());
        }
    },
    updateStyleCaptionImage: function(){
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        var textAlign = '';
        var textAlignImage = '';
        
        if (opt.textAlign == 0){
            textAlign = 'left';
        } else if(opt.textAlign == 1){
            textAlign = 'center';
        } else if (opt.textAlign == 2){
            textAlign = 'right';
        }
        if (opt.imgAlignment == 0){
            textAlignImage = 'left';
        } else if(opt.imgAlignment == 1){
            textAlignImage = 'center';
        } else if (opt.imgAlignment == 2){
            textAlignImage = 'right';
        }
        var fontTypeFace = '';
        if(opt.fontTypeFace != 'None'){
            fontTypeFace = opt.fontTypeFace
        }
        
        $tpl.find('.ebTextContent').css({
            fontFamily: fontTypeFace,
            fontWeight: opt.fontWeight,
            fontSize: opt.fontSize + 'px',
            color: opt.color,
            lineHeight: opt.lineHeight + '%',
            textAlign: textAlign
        });
        $tpl.find('.ebImageContent').css({
            textAlign: textAlignImage
        });
    },
    removeColumnCaptionTpl: function(){
        var $tpl = $('.tpl-block.tpl-selected');
        var $col = $tpl.find('.ebImageBlock');
        $col.eq(1).remove();
    },
    updateVideoImg: function(link){
        var indexStart;
        var videoId;
        var titleImg = 'Upload an Image';
        var sizeWidthImg = 0;
        
        if (link.indexOf('vimeo.com/') != '-1'){
            
            indexStart = link.lastIndexOf('/') + 1;
            videoId = link.substr(indexStart);
            $.ajax({
                type:'GET',
                url: 'http://vimeo.com/api/v2/video/' + videoId + '.json',
                jsonp: 'callback',
                dataType: 'json',
                success: function(data){
                    var thumbnailSrc = data[0].thumbnail_large;
                    
                    page.addVideoImg(thumbnailSrc, titleImg);
                },
                error: function(){
                    page.addVideoImg();
                }
            });
            
        } else if (link.indexOf('youtube.com/watch?v=') != '-1'){
            
            indexStart = link.lastIndexOf('watch?v=') + 8;
            videoId = link.substr(indexStart);
            var thumbnailSrc;
            
            if (videoId != ''){
                thumbnailSrc = "http://img.youtube.com/vi/"+videoId+"/maxresdefault.jpg";
                
            }
            
            page.addVideoImg(thumbnailSrc, titleImg);
            
        } else {
            page.addVideoImg();
        }
        
        
    },
    addVideoImg: function(thumbnailSrc, titleImg){
        var link = $('#videoUrlThumbnail').val();
        var $box = $('#videoImgUpload');
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        
        if(thumbnailSrc){
            var img = new Image();
            img.src = thumbnailSrc;
            img.onload = function() {
                $box.find('.eb-image-item-icon').replaceWith('<img src="'+thumbnailSrc+'" class="eb-image-item-icon">');
                $box.find('.eb-image-item-title').text('Thumbnail Video');


                $box.show();
                $('.eb-error-video').hide();
                $tpl.find('.ebImageContent').html('<a href="'+link+'" ><img style="vertical-align:top; margin:0; max-width: '+img.width+'px" class="eb-img-upload" src="'+thumbnailSrc+'"  width="'+$tpl.find('.ebImageContent').width()+'"/></a>')
                page.updateWidthImgs();
                $box.find('.eb-size-img').text(img.width+ ' × ' + img.height);
            }
        } else {
            $box.hide();
            $box.find('.eb-image-item-title').text(titleImg);
            if(link != ''){
                $('.eb-error-video').show();
            } else {
                $('.eb-error-video').hide();  
            }
            $tpl.find('.ebImageContent').html('<div class="eb-upload-image"><img class="eb-img-upload" src="imgs/imgs_email_builder/img_upload.jpg"/><p>Add Video URL in editor, drop a preview image here</p><a href="#" class="et-btn-white">Browse</a></div>');
            page.captionWidthImg();
        }
        opt.urlVideo = link; 
        $tpl.attr('data-json', JSON.stringify( opt ));
    },
    startVideoImg: function(){
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        var type = $tpl.attr('data-type');
        var $videoImgUpload = $('#videoImgUpload');
        var html = '';
        var $img = $tpl.find('.ebImageContent').find('img').eq(0);
        var sizeImg = '640 × 360';
        
        $('#videoUrlThumbnail').val(opt.urlVideo);
        
        if ( $img.length ){
            $videoImgUpload.show();
            $videoImgUpload.find('.eb-image-item-icon').replaceWith('<img src="'+$img.attr('src')+'" class="eb-image-item-icon">');
            $videoImgUpload.find('.eb-image-item-title').text('Thumbnail Video');
            
            var img = new Image();
            img.src = $img.attr('src');
            img.onload = function() {
                $videoImgUpload.find('.eb-size-img').text(img.width+ ' × ' + img.height);
            }
            
        } else {
            $videoImgUpload.hide();
            $videoImgUpload.find('.eb-image-item-icon').replaceWith('<img src="imgs/imgs_email_builder/img_none.png" class="eb-image-item-icon">');
        }
        $('.eb-error-video').hide();
        $('#eb-box-image-card').find('.eb-list-image').html('').append(html);
    },
    socialIconAction: function(){
        $('.eb-add-social-list').on('click', function(){
            var $tpl = $('.tpl-block.tpl-selected');
            var optionsShare = '';
            var optionsFollow = '';
			var optionsSocial = '';
			var optionsCalendar = '';
            var isCalendar = false;
			var indexIcon = 0;
			var labelDefault = 'Facebook Page URL';
			var urlDefault = 'https://www.facebook.com/';
			var textDefault = 'Facebook';
			
            if ( $tpl.attr('data-type') == 'box-social-follow' ){
                optionsFollow = '<option value="6">YouTube</option>'+
                                '<option value="7">Instagram</option>'+
                                '<option value="8">Vimeo</option>'+
                                '<option value="9">RSS</option>'+
                                '<option value="10">Email</option>'+
                                '<option value="11">Website</option>';
            } else if ( $tpl.attr('data-type') == 'box-calendar' ){
				isCalendar = true;
				indexIcon = 12;
				labelDefault = 'Google Calendar URL';
				urlDefault = '#';
				textDefault = 'Google Calendar';
                optionsCalendar = '<option value="12">Google</option>'+
                                '<option value="13">Outlook</option>'+
                                '<option value="14">Outlook Online</option>'+
                                '<option value="15">iCalendar</option>'+
                                '<option value="16">Yahoo!</option>';
            } else {
                optionsShare = '<option value="5">Forward to Friend</option>';
            }  

			if ( !isCalendar ){
				optionsSocial = '<option value="0">Facebook</option>'+
								'<option value="1">Twitter</option>'+
								'<option value="2">Google +1</option>'+
								'<option value="3">LinkedIn</option>'+
								'<option value="4">Pinterest</option>';
			}
					

            $('.eb-list-group-social').append('<li class="item-social clearfix" idx="0"  datasortid="'+$('.eb-list-group-social').children('li').length+'">'+
                                '<a href="javascript:void(0);" class="et-btn-white eb-btn-delete-elm"><i class="icn"></i></a>'+
                                '<a href="javascript:void(0);" class="et-btn-white eb-btn-move-elm"><i class="icn"></i></a>'+
                                '<div class="eb-icon-social eb-icon-'+indexIcon+'"></div> '+
                                '<select class="eb-social-list">'+
                                    optionsSocial+
                                    optionsShare+
                                    optionsFollow+
									optionsCalendar+
                                '</select>'+
                                '<div class="eb-fields-social">'+
                                    '<div class="t-field">'+
                                        '<div class="label">'+
                                            '<label>'+labelDefault+'</label>'+
                                        '</div>'+
                                        '<input type="text" class="txt-field eb-field-social-link" value="'+urlDefault+'"/>'+
                                    '</div>'+
                                    '<div class="t-field">'+
                                        '<div class="label">'+
                                            '<label>Line Text</label>'+
                                        '</div>'+
                                        '<input type="text" class="txt-field eb-field-social-text" value="'+textDefault+'"/>'+
                                    '</div>'+
                                '</div>'+
                            '</li>');
                    $('.eb-list-group-social select:visible').chosen();
                    page.countGroupSocial();
                    page.isSocialFollowLink();
                    page.updateSocialHtml(true);
        });
        $('.eb-list-group-social').on('click', '.eb-btn-delete-elm', function(){
            $(this).parents('li').remove();
            
            page.updateSocialHtml();
            $('.eb-list-group-social').children('li').each(function(i){
                $(this).attr('datasortid', i);
            });
            page.countGroupSocial();
        });
        
        $('.eb-list-group-social').on('keyup', '.eb-field-social-link', function(){ 
            var $tpl = $('.tpl-block.tpl-selected');
            var $li = $(this).parents('li');
            var typeIcon = $li.attr('idx');
            var $table = $tpl.find('.ebShareContentItemContainer:first').children('table').eq( $li.attr('datasortid') );
            var val = $(this).val();
            
            if(val == ''){
                val = 'http://';
            }
            $table.find('.mcnShareTextContent, .mcnShareIconContent').find('a').attr('href',val);
        });
        $('.eb-list-group-social').on('keyup', '.eb-field-social-text', function(){ 
            var $tpl = $('.tpl-block.tpl-selected');
            var $li = $(this).parents('li');
            var typeIcon = $li.attr('idx');
            var $table = $tpl.find('.ebShareContentItemContainer:first').children('table').eq( $li.attr('datasortid') );
            var val = $(this).val();
            var masDefaultFollowText = ['Facebook','Twitter','Google Plus','LinkedIn','Pinterest','Forward to Friend','YouTube','Instagram','Vimeo','RSS','Email','Website','Google Calendar','Outlook','Outlook Online','iCalendar','Yahoo! Calendar'];
            
            if(val == ''){
                val = masDefaultFollowText[typeIcon];
            }
            $table.find('.mcnShareTextContent a').text(val);
        });
        $('#select-content-to-share').change(function(){
            var val = $(this).val();
            var $tpl = $('.tpl-block.tpl-selected');
            var opt = $tpl.data('json');
            
            if( parseInt(val) ){
                $('#shareCustomLink').val(opt.shareLink);
                $('#shareShortDesc').val(opt.shareDesc);
                $('.eb-share-custom-text').show();
            } else {
                $('.eb-share-custom-text').hide();
            }
            
            opt.shareCustomUrl = val;
            $tpl.attr('data-json', JSON.stringify( opt ));
            page.updateSocialShareLink();
        });
        $('#shareCustomLink').keyup(function(){
            var val = $(this).val();
            var $tpl = $('.tpl-block.tpl-selected');
            var opt = $tpl.data('json');
            
            opt.shareLink = val;
            $tpl.attr('data-json', JSON.stringify( opt ));
            page.updateSocialShareLink();
        });
        $('#shareShortDesc').keyup(function(){
            var val = $(this).val();
            var $tpl = $('.tpl-block.tpl-selected');
            var opt = $tpl.data('json');
            
            opt.shareDesc = val;
            $tpl.attr('data-json', JSON.stringify( opt ));
            page.updateSocialShareLink();
        });
        $('.eb-wrap-layout-social li').on('click', function(){
            var index = $(this).parent().find('li').index($(this));
            var $tpl = $('.tpl-block.tpl-selected');
            var opt = $tpl.data('json');
            var $table = $tpl.find('.ebShareContentItemContainer:first').children('table');
            
            $(this).addClass('selected').siblings('li').removeClass('selected');
            
            if (opt.display){
                if( index == 0  || index == 3 ){
                    $table.find('.mcnShareIconContent img').width('48px').height('48px').attr('width','48px').attr('height','48px');
                } else {
                    $table.find('.mcnShareIconContent img').width('28px').height('28px').attr('width','28px').attr('height','28px');
                }
            } else {
                $table.find('.mcnShareIconContent img').width('28px').height('28px').attr('width','28px').attr('height','28px');
            }
            
            opt.layout = index;
            $tpl.attr('data-json', JSON.stringify( opt ));
            page.updateSocialHtml();
			
            if (opt.display){
                page.updateDisplayOption();
            }
        });
        $('.eb-list-group-social').on('change', '.eb-social-list', function(){
            var val = $(this).val();
            page.addNewSocialService(val, $(this));
        });
    },
    
    countGroupSocial: function(){
        var $box = $('.eb-list-group-social');
        var $tpl = $('.tpl-block.tpl-selected');
        var $btn = $('.eb-add-social-list');
        
        if( $box.children('li').length > 1){
            $box.removeClass('eb-one-item');
        } else {
            $box.addClass('eb-one-item');
        }
        if ( $tpl.attr('data-type') == 'box-social-follow' ){
            if ($box.children('li').length < 11){
                $btn.show();
            } else{
                $btn.hide();
            }
        } else if ( $tpl.attr('data-type') == 'box-calendar' ){
            if ($box.children('li').length < 5){
                $btn.show();
            } else{
                $btn.hide();
            }
        } else{
            if ($box.children('li').length < 6){
                $btn.show();
            } else{
                $btn.hide();
            }
        }
        
    },
    isSocialFollowLink: function(){
        var $tpl = $('.tpl-block.tpl-selected');
        var $box = $('.eb-list-group-social').find('.eb-fields-social');
        if ( $tpl.attr('data-type') == 'box-social-follow' /*|| $tpl.attr('data-type') == 'box-calendar'*/){
            $box.show();
        } else {
            $box.hide();
        }
    },
    addNewSocialService: function(val, $el){
        var $tpl = $('.tpl-block.tpl-selected');
        var $li = $el.parent();
        var $table = $tpl.find('.ebShareContentItemContainer:first').children('table').eq( $li.attr('datasortid') );
        var masIcon = ['fb.png','tw.png','gg.png','in.png','pinterest.png','forward.png','youtube.png','inst.png','vimeo.png','rss.png','email.png','website.png','google.png','outlook.png','outlook_online.png','icalendar.png','yahoo.png'];
        var masTextLabel =['Facebook Page URL','Twitter URL or Username','Google Plus Profile URL','LinkedIn Profile URL','Pinterest Board URL','Friend Profile URL','YouTube Channel URL','Instagram Profile URL','Vimeo URL','RSS URL','Email Address','Page URL', 'Google Calendar URL', 'Outlook URL', 'Outlook Online URL', 'iCalendar URL', 'Yahoo! Calendar URL'];
        var masDefaultFollowText = ['Facebook','Twitter','Google Plus','LinkedIn','Pinterest','Forward to Friend','YouTube','Instagram','Vimeo','RSS','Email','Website','Google Calendar','Outlook','Outlook Online','iCalendar','Yahoo! Calendar'];
        var masDefaultShareText = ['Share','Tweet','+1','Share','Pin','Forward'];
        var masDefaultShareUrl = ['http://www.facebook.com/sharer/sharer.php?u=','http://twitter.com/intent/tweet?text=','https://plus.google.com/share?url=','http://www.linkedin.com/shareArticle?url=','https://www.pinterest.com/pin/find/?url='];
        var masDefaultFollowUrl = ['http://www.facebook.com/','http://www.twitter.com/','http://plus.google.com/','http://www.linkedin.com/','http://www.pinterest.com/','','http://www.youtube.com/','http://instagram.com/','https://vimeo.com/','http://www.yourfeedurl.com/','your@email.com','http://www.yourwebsite.com/','#','#','#','#','#'];
		var $boxFields = $li.find('.eb-fields-social');
		
        $li.find('.eb-icon-social').removeClass('eb-icon-0 eb-icon-1 eb-icon-2 eb-icon-3 eb-icon-4 eb-icon-5 eb-icon-6 eb-icon-7 eb-icon-8 eb-icon-9 eb-icon-10 eb-icon-11 eb-icon-12 eb-icon-13 eb-icon-14 eb-icon-15 eb-icon-16').addClass('eb-icon-'+val);
        $li.attr('idx', val);
        $table.attr('data-type-social',val);

        if ( $tpl.attr('data-type') == 'box-social-follow' || $tpl.attr('data-type') == 'box-calendar'){
            $boxFields.find('.t-field:first label').text(masTextLabel[val]);
            $boxFields.find('.t-field:first .txt-field').val(masDefaultFollowUrl[val]);
            $boxFields.find('.t-field:last .txt-field').val(masDefaultFollowText[val]);
            $table.find('.mcnShareTextContent a').text(masDefaultFollowText[val]).attr('href',masDefaultFollowUrl[val]);
            $table.find('.mcnShareIconContent a').attr('href',masDefaultFollowUrl[val]);
        } else {
            $boxFields.find('.t-field:last .txt-field').val(masDefaultShareText[val]);
            $table.find('.mcnShareTextContent a').text(masDefaultShareText[val]);
            page.updateSocialShareLink($li.attr('datasortid'));
        }
        var src = $table.find('.mcnShareIconContent').find('img').attr('src');
        $table.find('.mcnShareIconContent').find('img').attr('src', src.slice(0, src.lastIndexOf('/'))+'/'+masIcon[val]);
    },
    updateSocialShareLink: function(pos){
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        var $table = $tpl.find('.ebShareContentItemContainer:first').children('table');
        var masDefaultShareUrl = ['http://www.facebook.com/sharer/sharer.php?u=','http://twitter.com/intent/tweet?text=','https://plus.google.com/share?url=','http://www.linkedin.com/shareArticle?url=','https://www.pinterest.com/pin/find/?url=','#'];
        var href = '';
        var customLink = '';
        var customDesc = '';
        if(opt.shareCustomUrl == '1'){
            customLink = opt.shareLink;
            customDesc = opt.shareDesc;
        }
        if (pos) {
            $table = $table.eq(pos);
        }
        $table.each(function(){
            var type = $(this).attr('data-type-social');
            if (type == '0'){
                href = masDefaultShareUrl[0] + customLink
            } else if (type == '1'){
                if(opt.shareCustomUrl == '1'){
                    href = masDefaultShareUrl[1] + customDesc + ': ' + customLink
                } else {
                    href = masDefaultShareUrl[1];
                }
                
            } else if (type == '2'){
                href = masDefaultShareUrl[2] + customLink
            } else if (type == '3'){
                href = masDefaultShareUrl[3] + customLink + '&mini=true&title=' + customDesc;
            } else if (type == '4'){
                href = masDefaultShareUrl[4] + customLink;
            } else if (type == '5'){
                href = masDefaultShareUrl[5];
            }
            $(this).find('a').attr('href', href);
        });
    },
    sortableSocial: function(){
        $('.eb-list-group-social').sortable({
            cursor: 'move',
            handle: '.eb-btn-move-elm',
            tolerance: 'intersect',
            stop: function(event, ui) {
                page.updateSocialHtml();
                $('.eb-list-group-social').children('li').each(function(i){
                    $(this).attr('datasortid',i);
                });
            }
        });
    },
    updateSocialGroupHtml: function(){
        var $tpl = $('.tpl-block.tpl-selected');
        var $el = $tpl.find('.ebShareContentItemContainer:first').children('table');
        var optionsFollow = '';
        var optionsShare = '';
		var optionsSocial = '';
		var optionsCalendar = '';
        var isFollow =  false;
		var isCalendar =  false;
        var masDefaultFollowText = ['Facebook','Twitter','Google Plus','LinkedIn','Pinterest','Forward to Friend','YouTube','Instagram','Vimeo','RSS','Email','Website','Google Calendar','Outlook','Outlook Online','iCalendar','Yahoo! Calendar'];
        
		
		
        if ( $tpl.attr('data-type') == 'box-social-follow' ){
            isFollow = true;
            optionsFollow = '<option value="6">YouTube</option>'+
                            '<option value="7">Instagram</option>'+
                            '<option value="8">Vimeo</option>'+
                            '<option value="9">RSS</option>'+
                            '<option value="10">Email</option>'+
                            '<option value="11">Website</option>';
        } else if ( $tpl.attr('data-type') == 'box-calendar' ){
			isCalendar = true;
			optionsCalendar = '<option value="12">Google</option>'+
                            '<option value="13">Outlook</option>'+
                            '<option value="14">Outlook Online</option>'+
                            '<option value="15">iCalendar</option>'+
                            '<option value="16">Yahoo!</option>';
		} else {
            optionsShare = '<option value="5">Forward to Friend</option>';
        }
		
		if( !isCalendar ){
			optionsSocial = '<option value="0">Facebook</option>'+
							'<option value="1">Twitter</option>'+
							'<option value="2">Google +1</option>'+
							'<option value="3">LinkedIn</option>'+
							'<option value="4">Pinterest</option>';
		}
        $('.eb-list-group-social li').remove();
        
        $el.each(function(i){
            var $btn = $(this);
            var type = $btn.attr('data-type-social');
            var $url = $btn.find('.mcnShareIconContent a');
            var $text = $btn.find('.mcnShareTextContent a');
            var link = '';
            var text = '';
            var masTextLabel =['Facebook Page URL','Twitter URL or Username','Google Plus Profile URL','LinkedIn Profile URL','Pinterest Board URL','Friend Profile URL','YouTube Channel URL','Instagram Profile URL','Vimeo URL','RSS URL','Email Address','Page URL', 'Google Calendar URL', 'Outlook URL', 'Outlook Online URL', 'iCalendar URL', 'Yahoo! Calendar URL'];
            
            if($url.length){
                link = $url.attr('href');
                var text = masDefaultFollowText[$btn.attr('data-type-social')];
            }
            if($text.length){
                link = $text.attr('href');
                text = $text.text();
            }           
            $('.eb-list-group-social').append('<li class="item-social clearfix" idx="'+type+'" datasortid="'+i+'">'+
                                    '<a href="javascript:void(0);" class="et-btn-white eb-btn-delete-elm"><i class="icn"></i></a>'+
                                    '<a href="javascript:void(0);" class="et-btn-white eb-btn-move-elm"><i class="icn"></i></a>'+
                                    '<div class="eb-icon-social eb-icon-'+type+'"></div> '+
                                    '<select class="eb-social-list">'+
                                        optionsSocial+
                                        optionsShare+
                                        optionsFollow+
										optionsCalendar+
                                    '</select>'+
                                    '<div class="eb-fields-social">'+
                                        '<div class="t-field">'+
                                            '<div class="label">'+
                                                '<label>'+masTextLabel[type]+'</label>'+
                                            '</div>'+
                                            '<input type="text" class="txt-field eb-field-social-link" value="'+link+'"/>'+
                                        '</div>'+
                                        '<div class="t-field">'+
                                            '<div class="label">'+
                                                '<label>Line Text</label>'+
                                            '</div>'+
                                            '<input type="text" class="txt-field eb-field-social-text" value="'+text+'"/>'+
                                        '</div>'+
                                    '</div>'+
                                '</li>');
                        var $chosen = $('.eb-list-group-social select:visible');
                        $chosen.chosen();
                        $chosen.find('option[value="'+type+'"]').attr('selected', true);
                        $chosen.trigger('liszt:updated');
                        if(isFollow /*|| isCalendar*/ ){
                            $('.eb-list-group-social .eb-fields-social').show();
                        }
            });
        
    },
    updateDisplayOption: function(){
        var $tpl = $('.tpl-block.tpl-selected');
        var opt = $tpl.data('json');
        var $el = $tpl.find('.ebShareContentItemContainer:first').children('table');
        var masIcon = ['fb.png','tw.png','gg.png','in.png','pinterest.png','forward.png','youtube.png','inst.png','vimeo.png','rss.png','email.png','website.png','google.png','outlook.png','outlook_online.png','icalendar.png','yahoo.png'];
        var masDefaultFollowText = ['Facebook','Twitter','Google Plus','LinkedIn','Pinterest','Forward to Friend','YouTube','Instagram','Vimeo','RSS','Email','Website','Google Calendar','Outlook','Outlook Online','iCalendar','Yahoo! Calendar'];
		var link = '';
        var imgSrc = '';
        var id = '';
        var text = '';
        var btnIconHtml = false;
        var btnTextHtml = false;
        var htmlBtn = '';
        
        $el.each(function(i){
            var $this = $(this);
            var $btn = $this.find('table:last > tbody');
            id = $this.attr('data-type-social');
            
            if ( $btn.find('.mcnShareIconContent').length && !$btn.find('.mcnShareTextContent').length ){
                link = $btn.find('.mcnShareIconContent > a').attr('href');
                imgSrc = $btn.find('.mcnShareIconContent > a > img').attr('src');
                text = $('.eb-list-group-social > li').eq(i).find('.eb-field-social-text').val();
                if ($.trim(text) == ''){
                    text = masDefaultFollowText[id];
                }
                btnIconHtml = $btn.find('.mcnShareIconContent').parent().html();
                btnTextHtml = '<td class="mcnShareTextContent" style="padding-left:5px;" align="left" valign="middle"><a href="'+link+'" style="color: rgb(80, 80, 80); font-size: 12px; font-weight: normal; line-height: 100%; text-align: center; text-decoration: none;" target="">'+text+'</a></td>';
                
            } else if ( !$btn.find('.mcnShareIconContent').length && $btn.find('.mcnShareTextContent').length ){
                link = $btn.find('.mcnShareTextContent > a').attr('href');
                text = $btn.find('.mcnShareTextContent > a').text();
                var src = $('.eb-social-style-icon > li.selected img:visible:first').attr('src');
                imgSrc = src.slice(0, src.lastIndexOf('/')) + '/' + masIcon[id];
                btnTextHtml = $btn.find('.mcnShareTextContent').parent().html();
                btnIconHtml = '<td class="mcnShareIconContent" align="center" valign="middle" width="28"><a href="'+link+'" target="_blank"><img src="'+imgSrc+'" style="display: block; width: 28px; height: 28px;" class="" width="28" height="28"></a></td>';
            } else {
                btnIconHtml = '<td class="mcnShareIconContent" align="center" valign="middle" width="28">'+$btn.find('.mcnShareIconContent').html()+'</td>';
                btnTextHtml = '<td class="mcnShareTextContent" style="padding-left:5px;" align="left" valign="middle">'+$btn.find('.mcnShareTextContent').html()+'</td>';
            }
            
            $btn.html('');
            htmlBtn = '<tr>';
            
            if (opt.display == '0'){
                htmlBtn += btnIconHtml;
                htmlBtn += '</tr>';
                $btn.html(htmlBtn);
            } else if (opt.display == '1'){
                htmlBtn += btnTextHtml;
                htmlBtn += '</tr>';
                $btn.html(htmlBtn);
            } else {
                if (opt.layout == '0' || opt.layout == '3'){
                    htmlBtn += btnIconHtml;
                    htmlBtn += '</tr>';
                    htmlBtn += '</tr>';
                    htmlBtn += btnTextHtml;
                } else {
                    htmlBtn += btnIconHtml;
                    htmlBtn += btnTextHtml;
                }
                htmlBtn += '</tr>';
                $btn.html(htmlBtn);
            }
            if (opt.display == '2' && opt.layout == '0'){
                $btn.parent().attr('width','100%');
                $el.find('.ebShareContentItem').attr('width','100%');
            } else {
                $btn.parent().attr('width','');
                $el.find('.ebShareContentItem').attr('width','');
            }
            if (opt.display == '2' && (opt.layout == '0' || opt.layout == '3') ){
                $btn.find('.mcnShareTextContent').css({
                    'padding-left': '0px',
                    'text-align': 'center'
                });
                $tpl.find('.mcnShareIconContent').css('padding-bottom','5px');
            } else {
                $btn.find('.mcnShareTextContent').css({
                    'padding-left': '5px',
                    'text-align': 'left'
                });
                $tpl.find('.mcnShareIconContent').css('padding-bottom','0px');
                if ( opt.display == '1' ){
                    $btn.find('.mcnShareTextContent').css({
                        'padding-left': '0px'
                    });
                }
            }
            if ( opt.display == '1' || opt.display == '2' ){
                var $a = $btn.find('.mcnShareTextContent a');
                var lineHeight = opt.lineHeight;
                $a.css({
                    'font-family': opt.fontTypeFace + ', sans-serif',
                    'font-size': opt.fontSize + 'px',
                    'color': opt.color,
                    'font-weight': opt.fontWeight
                });
                if (lineHeight == 'None'){
                    $a.css('line-height','normal');
                }else{
                    $a.css('line-height',opt.lineHeight + '%');
                }
            }
        });
    },
    updateSocialHtml: function(isAddNew){
        var $tpl = $('.tpl-block.tpl-selected');
        var $el = $tpl.find('.ebShareContentItemContainer:first');
        var $table = $el.children('table');
        var html = '';
        var isFollow = false;
        var opt = $tpl.data('json');
        var masLinkImage = ['',''];
        var count = $('.eb-list-group-social').children('li').length;
        var widthTable = '';
        var isVertical = false;
        
        if ( opt.display == '0'  || opt.display == '2'){
            if ( opt.layout == '0' || opt.layout == '1' ){
                isVertical = true;
            }
        } else {
            if ( opt.layout == '0'){
                isVertical = true;
            }
        }
        
        if ( isVertical ){
            //console.log('ver');
            widthTable = '100%';
        }  else{
            //console.log('goriz');
            html = '<!--[if mso]>'+
                    '<table align="center" border="0" cellspacing="0" cellpadding="0">'+
                    '<tr>'+
                    '<![endif]-->';
        }
        $('.eb-list-group-social').children('li').each(function(i){
            var $li = $(this);
            var type = $li.attr('idx');
            var index = $li.attr('datasortid');
            if ( !isVertical ){
                html +='<!--[if mso]>'+
                    '<td align="center" valign="top">'+
                    '<![endif]-->';
            }
            if(isAddNew && count-1 == i){
                html += '<table data-type-social="0" width="'+widthTable+'" align="left" border="0" cellpadding="0" cellspacing="0">' + $table.eq(0).html() +'</table>';    
            } else {
               html += '<table data-type-social="'+$table.eq(index).attr('data-type-social')+'" width="'+widthTable+'" align="left" border="0" cellpadding="0" cellspacing="0">' + $table.eq(index).html() +'</table>';
            }
            if ( !isVertical ){
                html +='<!--[if mso]>'+
                '</td>'+
                '<![endif]-->';
            }        
                    
        });
        if ( !isVertical ){
            html +='<!--[if mso]>'+
            '</tr>'+
            '</table>'+
            '<![endif]-->';
        } 
        $el.html(html);
        $el.find('.ebShareContentItemContainer').each(function(i){
            if ( !isVertical ){
                $(this).css('padding-right','9px');
                if(opt.width =='1'){
                    $tpl.find('.ebShareContent').attr('width','100%').css('width','100%');
                } else {
                    $tpl.find('.ebShareContent').attr('width','auto').css('width','auto');
                }
                $tpl.find('.ebShareContent').find('table:first').attr('width','auto').css('width','auto');
            } else {
                $(this).css('padding-right','0');
                if(opt.width =='1'){
                    $tpl.find('.ebShareContent').attr('width','100%').css('width','100%');
                } else {
                    $tpl.find('.ebShareContent').attr('width','28px').css('width','28px');
                }
                $tpl.find('.ebShareContent').find('table:first').attr('width','28px').css('width','28px');  
            }
            if(isAddNew && count-1 == i){
                $(this).css('padding-right','0px');
                if( $tpl.attr('data-type') == 'box-social-follow' ){
                    $(this).find('.mcnShareTextContent a').text('Facebook').attr('href','https://www.facebook.com/');
                    $(this).find('.mcnShareIconContent a').attr('href','https://www.facebook.com/');
                } else if( $tpl.attr('data-type') == 'box-calendar' ){
                    $(this).find('.mcnShareTextContent a').text('Google Calendar').attr('href','#');
                    $(this).find('.mcnShareIconContent a').attr('href','#');
                } else {
                    $(this).find('.mcnShareTextContent a').text('Share').attr('href','https://www.facebook.com/');
                    $(this).find('.mcnShareIconContent a').attr('href','https://www.facebook.com/');
                }
                var src= $(this).find('.mcnShareIconContent a img').attr('src');
				if( $tpl.attr('data-type') == 'box-calendar' ){
					$(this).find('.mcnShareIconContent a').find('img').attr('src', src.slice(0, src.lastIndexOf('/'))+'/google.png');
				} else{
					$(this).find('.mcnShareIconContent a').find('img').attr('src', src.slice(0, src.lastIndexOf('/'))+'/fb.png');
				}
                
            }
        });
    },
	resizeTinymce: function(){
		var $box = $('.wrap-tabs-content:visible').find('.eb-editor-text');
		if ( $box.length ){
			var id = $box .find('iframe').attr('id');
			var newId = id.replace('_ifr','');
			var fullHeight = $(window).height();
			var heightEditor = fullHeight - $box.find('iframe').offset().top - $('#footer').outerHeight();
			tinymce.get(newId).settings.autoresize_max_height = heightEditor;
			tinymce.get(newId).settings.autoresize_min_height = heightEditor;
			tinymce.get(newId).settings.height = heightEditor;
			$('#' + id).height(heightEditor);
			tinymce.get(newId).getBody().focus();
		}
		
	},
	clearStyleAll: function(type){
		var $tpl = $('.tpl-block.tpl-selected');
		var opt = $tpl.data('json');
		var typeTpl = $tpl.attr('data-type');
		
		if ( type == 'bgColor' ){
			if ( typeTpl == 'box-text' ||  typeTpl == 'box-border-text' || typeTpl == 'box-footer' ){
				$('#boxTextBackground').colpickSetColor('ffffff', true).css('background-color', '#ffffff');
				$tpl.find('.ebTextBlockInner').css('background-color','');
				opt.boxesBackgroundColor = '#ffffff';
			} else if ( typeTpl == 'box-divider' ){
				$('#dividerBackgroundColor').colpickSetColor('ffffff', true).css('background-color', '#ffffff');
				$tpl.find('.ebDividerBlock').css('background-color','#ffffff');
				opt.backgroundColor = '#ffffff';
			} else if ( typeTpl == 'box-image-card' ){
				$('#cardBackground').colpickSetColor('ffffff', true).css('background-color', '#ffffff');
				$tpl.find('.ebImageBlock').css('background-color','#ffffff');
				opt.backgroundColor = '#ffffff';
			} else if ( typeTpl == 'box-video' ){
				$('#videoBackground').colpickSetColor('ffffff', true).css('background-color', '#ffffff');
				$tpl.find('.ebImageBlock').css('background-color','#ffffff');
				opt.backgroundColor = '#ffffff';
			} else if ( typeTpl == 'box-social-share' || typeTpl == 'box-social-follow' || typeTpl == 'box-calendar'){
				$('#containerSocialBackground').colpickSetColor('ffffff', true).css('background-color', '#ffffff');
				$tpl.find('.ebShareContent').css('background-color','#ffffff');
				opt.containerBackground = '#ffffff';
			} else if ( typeTpl == 'box-button' ){
				$('#buttonBackground').colpickSetColor('fb8f04', true).css('background-color', '#fb8f04');
				$tpl.find('.ebButtonContentContainer').css('background-color','#fb8f04');
				opt.backgroundColor = '#fb8f04';
			}
			
		} else if ( type == 'bgButtonColor' ){
			if ( typeTpl == 'box-social-share'){
				$('#btnSocialBackground').colpickSetColor('fafafa', true).css('background-color', '#fafafa');
				$tpl.find('.ebShareContentItem').css('background-color','');
				opt.btnBackground = '#fafafa';
			} else if ( typeTpl == 'box-social-follow' || typeTpl == 'box-calendar'){
				$('#btnSocialBackground').colpickSetColor('ffffff', true).css('background-color', '#ffffff');
				$tpl.find('.ebShareContentItem').css('background-color','');
				opt.btnBackground = '#ffffff';
			}
		} else if ( type == 'font' ){
			if ( typeTpl == 'box-text' ||  typeTpl == 'box-border-text' || typeTpl == 'box-footer' ){
				$('#boxTextTypeFace option[value="None"]').attr('selected', true);
				$("#boxTextTypeFace").trigger('liszt:updated');
				
				$('#boxTextWeight option[value="None"]').attr('selected', true);
				$("#boxTextWeight").trigger('liszt:updated');
				
				$('#boxTextSize option[value="None"]').attr('selected', true);
				$("#boxTextSize").trigger('liszt:updated');

				$('#boxTextColor').colpickSetColor('333333', true).css('background-color', '#333333');
				
				opt.color = '#333333';
				opt.fontTypeFace = 'None';
				opt.fontWeight = 'None';
				opt.fontSize = 'None';
				
				$tpl.find('.ebTextContent').css({
					color: '',
					fontSize: '',
					fontWeight: '',
					fontFamily: ''
				});
			} else if ( typeTpl == 'box-image-card' ){
				$('#cardTypeFace option[value="None"]').attr('selected', true);
				$("#cardTypeFace").trigger('liszt:updated');
				
				$('#cardWeight option[value="None"]').attr('selected', true);
				$("#cardWeight").trigger('liszt:updated');
				
				$('#cardSize option[value="None"]').attr('selected', true);
				$("#cardSize").trigger('liszt:updated');

				$('#cardTextColor').colpickSetColor('333333', true).css('background-color', '#333333');
				
				opt.color = '#333333';
				opt.fontTypeFace = 'None';
				opt.fontWeight = 'None';
				opt.fontSize = 'None';
				
				$tpl.find('.ebTextContent').css({
					color: '',
					fontSize: '',
					fontWeight: '',
					fontFamily: ''
				});
			} else if ( typeTpl == 'box-image-caption'){
				$('#captionTypeFace option[value="None"]').attr('selected', true);
				$("#captionTypeFace").trigger('liszt:updated');
				
				$('#captionWeight option[value="None"]').attr('selected', true);
				$("#captionWeight").trigger('liszt:updated');
				
				$('#captionSize option[value="None"]').attr('selected', true);
				$("#captionSize").trigger('liszt:updated');

				$('#captionTextColor').colpickSetColor('333333', true).css('background-color', '#333333');
				
				opt.color = '#333333';
				opt.fontTypeFace = 'None';
				opt.fontWeight = 'None';
				opt.fontSize = 'None';
				
				$tpl.find('.ebTextContent').css({
					color: '',
					fontSize: '',
					fontWeight: '',
					fontFamily: ''
				});
			} else if ( typeTpl == 'box-video' ){
				$('#videoTypeFace option[value="None"]').attr('selected', true);
				$("#videoTypeFace").trigger('liszt:updated');
				
				$('#videoWeight option[value="None"]').attr('selected', true);
				$("#videoWeight").trigger('liszt:updated');
				
				$('#videoSize option[value="None"]').attr('selected', true);
				$("#videoSize").trigger('liszt:updated');

				$('#videoTextColor').colpickSetColor('333333', true).css('background-color', '#333333');
				
				opt.color = '#333333';
				opt.fontTypeFace = 'None';
				opt.fontWeight = 'None';
				opt.fontSize = 'None';
				
				$tpl.find('.ebTextContent').css({
					color: '',
					fontSize: '',
					fontWeight: '',
					fontFamily: ''
				});
			} else if ( typeTpl == 'box-social-share' || typeTpl == 'box-social-follow' || typeTpl == 'box-calendar'){
				$('#btnSocialTypeFace option[value="Arial"]').attr('selected', true);
				$("#btnSocialTypeFace").trigger('liszt:updated');
				
				$('#btnSocialWeight option[value="None"]').attr('selected', true);
				$("#btnSocialWeight").trigger('liszt:updated');
				
				$('#btnSocialSize option[value="12"]').attr('selected', true);
				$("#btnSocialSize").trigger('liszt:updated');

				$('#btnSocialColor').colpickSetColor('505050', true).css('background-color', '#505050');
				
				opt.color = '#505050';
				opt.fontTypeFace = 'Arial';
				opt.fontWeight = 'None';
				opt.fontSize = '12';
				
				$tpl.find('.mcnShareTextContent > a').css({
					color: '#505050',
					fontSize: '12px',
					fontWeight: 'Normal',
					fontFamily: 'Arial, sans-serif'
				});
			} else if ( typeTpl == 'box-button' ){
				$('#buttonTypeFace option[value="Arial"]').attr('selected', true);
				$("#buttonTypeFace").trigger('liszt:updated');
				
				$('#buttonWeight option[value="Bold"]').attr('selected', true);
				$("#buttonWeight").trigger('liszt:updated');
				
				$('#buttonSize option[value="16"]').attr('selected', true);
				$("#buttonSize").trigger('liszt:updated');

				$('#buttonTextColor').colpickSetColor('ffffff', true).css('background-color', '#ffffff');
				
				opt.color = '#ffffff';
				opt.fontTypeFace = 'Arial';
				opt.fontWeight = 'Bold';
				opt.fontSize = '16';
				
				$tpl.find('.ebButtonContent, .ebButton').css({
					color: '#ffffff',
					fontSize: '16px',
					fontWeight: 'Bold',
					fontFamily: 'Arial, sans-serif'
				});
			}
			
			
		} else if ( type == 'lineHeight'){
			if ( typeTpl == 'box-text' ||  typeTpl == 'box-border-text' || typeTpl == 'box-footer' ){
				$('#boxTextLineHeight option[value="None"]').attr('selected', true);
				$("#boxTextLineHeight").trigger('liszt:updated');
				
				opt.lineHeight = 'None';
				
				$tpl.find('.ebTextContent').css({
					lineHeight: '',
				});
			} else if ( typeTpl == 'box-image-card' ){
				$('#cardLineHeight option[value="None"]').attr('selected', true);
				$("#cardLineHeight").trigger('liszt:updated');
				
				opt.lineHeight = 'None';
				
				$tpl.find('.ebTextContent').css({
					lineHeight: '',
				});
			} else if ( typeTpl == 'box-image-caption'){
				$('#captionLineHeight option[value="None"]').attr('selected', true);
				$("#captionLineHeight").trigger('liszt:updated');
				
				opt.lineHeight = 'None';
				
				$tpl.find('.ebTextContent').css({
					lineHeight: '',
				});
			} else if ( typeTpl == 'box-video' ){
				$('#videoLineHeight option[value="None"]').attr('selected', true);
				$("#videoLineHeight").trigger('liszt:updated');
				
				opt.lineHeight = 'None';
				
				$tpl.find('.ebTextContent').css({
					lineHeight: '',
				});
			} else if ( typeTpl == 'box-social-share' || typeTpl == 'box-social-follow' || typeTpl == 'box-calendar'){
				$('#btnSocialLineHeight option[value="None"]').attr('selected', true);
				$("#btnSocialLineHeight").trigger('liszt:updated');
				
				opt.lineHeight = '100';
				
				$tpl.find('.mcnShareTextContent > a').css({
					lineHeight: 'normal',
				});
			}
			
			
		} else if ( type == 'textAlign'){
			if ( typeTpl == 'box-text' ||  typeTpl == 'box-border-text' || typeTpl == 'box-footer' ){
				$('#boxTextAlign').find('li.selected').removeClass('selected');
				
				opt.textAlign = 'None';
				
				$tpl.find('.ebTextContent').css({
					textAlign: '',
				});
			} else if ( typeTpl == 'box-image-card' ){
				$('#cardTextAlign').find('li.selected').removeClass('selected');
				
				opt.textAlign = 'None';
				
				$tpl.find('.ebTextContent').css({
					textAlign: '',
				});
			} else if ( typeTpl == 'box-image-caption'){
				$('#captionTextAlign').find('li.selected').removeClass('selected');
				
				opt.textAlign = 'None';
				
				$tpl.find('.ebTextContent').css({
					textAlign: '',
				});
			} else if ( typeTpl == 'box-video' ){
				$('#videoTextAlign').find('li.selected').removeClass('selected');
				
				opt.textAlign = 'None';
				
				$tpl.find('.ebTextContent').css({
					textAlign: '',
				});
			}
			
			
		} else if ( type == 'border' ){
			if ( typeTpl == 'box-border-text' || typeTpl == 'box-footer' ){
				$('#boxTextBorderType option[value="None"]').attr('selected', true);
				$("#boxTextBorderType").trigger('liszt:updated');
				
				$('#boxTextBorderWidth').val('0');
				
				$('#boxTextBorderColor').colpickSetColor('999999', true).css('background-color', '#999999');
				
				opt.boxesBorderType = 'None';
				opt.boxesBorderWidth = '0';
				opt.boxesBorderColor = '#999999';
				
				$tpl.find('.ebTextContent').css({
					border: '',
				});
			} else if ( typeTpl == 'box-divider' ){
				$('#dividerBorderType option[value="Solid"]').attr('selected', true);
				$("#dividerBorderType").trigger('liszt:updated');
				
				$('#dividerBorderWidth').val('1');
				
				$('#dividerBorderColor').colpickSetColor('999999', true).css('background-color', '#999999');

				opt.borderType = 'Solid';
				opt.borderWidth = '1';
				opt.borderColor = '#999999'; 

				$tpl.find('.ebDividerContent').css({
					borderTopWidth: '1px',
					borderTopStyle: 'solid', 
					borderTopColor: '#999999',
				});
			} else if ( typeTpl == 'box-image-card' ){
				$('#cardBorderType option[value="None"]').attr('selected', true);
				$("#cardBorderType").trigger('liszt:updated');
				
				$('#cardBorderWidth').val('0');
				
				$('#cardBorderColor').colpickSetColor('999999', true).css('background-color', '#999999');
				
				opt.borderType = 'None';
				opt.borderWidth = '0';
				opt.borderColor = '#999999';
				
				$tpl.find('.ebImageBlock').css({
					border: '',
				});
			} else if ( typeTpl == 'box-video' ){
				$('#videoBorderType option[value="None"]').attr('selected', true);
				$("#videoBorderType").trigger('liszt:updated');
				
				$('#videoBorderWidth').val('0');
				
				$('#videoBorderColor').colpickSetColor('999999', true).css('background-color', '#999999');
				
				opt.borderType = 'None';
				opt.borderWidth = '0';
				opt.borderColor = '#999999';
				
				$tpl.find('.ebImageBlock').css({
					border: '',
				});
			} else if ( typeTpl == 'box-social-share' || typeTpl == 'box-social-follow' || typeTpl == 'box-calendar'){
				$('#containerSocialBorderType option[value="None"]').attr('selected', true);
				$("#containerSocialBorderType").trigger('liszt:updated');
				
				$('#containerSocialBorderWidth').val('0');
				
				$('#containerSocialBorderColor').colpickSetColor('ffffff', true).css('background-color', '#ffffff');
				
				opt.containerBorderType = 'None';
				opt.containerBorderWidth = '0';
				opt.containerBorderColor = '#ffffff';
				
				$tpl.find('.ebShareContent').css({
					border: '',
				});
			} else if ( typeTpl == 'box-button' ){
				$('#buttonBorderType option[value="Solid"]').attr('selected', true);
				$("#buttonBorderType").trigger('liszt:updated');
				
				$('#buttonBorderWidth').val('1');
				
				$('#buttonBorderColor').colpickSetColor('fb8f04', true).css('background-color', '#fb8f04');
				
				opt.borderType = 'Solid';
				opt.borderWidth = '1';
				opt.borderColor = '#fb8f04';
				
				$tpl.find('.ebButtonContentContainer').css({
					border: '1px solid #fb8f04',
				});
			}
		} else if ( type == 'borderButton' ){
			
			if ( typeTpl == 'box-social-share'){
				$('#btnSocialBorderType option[value="Solid"]').attr('selected', true);
				$("#btnSocialBorderType").trigger('liszt:updated');
				
				$('#btnSocialBorderWidth').val('1');
				
				$('#btnSocialBorderColor').colpickSetColor('cccccc', true).css('background-color', '#cccccc');
				
				opt.btnBorderType = 'Solid';
				opt.btnBorderWidth = '1';
				opt.btnBorderColor = '#cccccc';
				
				$tpl.find('.ebShareContentItem').css({
					border: '1px solid #cccccc',
				});
			} else if ( typeTpl == 'box-social-follow' || typeTpl == 'box-calendar'){
				$('#btnSocialBorderType option[value="None"]').attr('selected', true);
				$("#btnSocialBorderType").trigger('liszt:updated');
				
				$('#btnSocialBorderWidth').val('0');
				
				$('#btnSocialBorderColor').colpickSetColor('cccccc', true).css('background-color', '#cccccc');
				
				opt.btnBorderType = 'None';
				opt.btnBorderWidth = '0';
				opt.btnBorderColor = '#ffffff';
				
				$tpl.find('.ebShareContentItem').css({
					border: '',
				});
			}
		} else if ( type == 'borderPadding' ){
			
			$('#dividerBorderColor').colpickSetColor('999999', true).css('background-color', '#999999');
				
			$('#dividerPaddingTop').val('18');
			$('#dividerBorderWidth').val('18');
			
			opt.paddingTop = '18';
			opt.dividerPaddingBottom = '18'; 
			
			$tpl.find('.ebDividerBlockInner').css({
				padding: '18px 0',
			});
		} else if ( type == 'btnPadding' ){
			$('#buttonPadding').val('12');
			
			opt.padding = '12';
			
			$tpl.find('.ebButtonContent').css({
				padding: '12px',
			});
		} else if ( type == 'btnRadius' ){
			
			if ( typeTpl == 'box-social-share' || typeTpl == 'box-social-follow' || typeTpl == 'box-calendar'){
				$('#btnSocialBorderRadius').val('5');
				opt.btnBorderRadius = '5'; 
				
				$tpl.find('.ebShareContentItem').css({
					borderRadius: '5px',
				});
			} else if ( typeTpl == 'box-button' ){
				$('#buttonRadius').val('3');
				opt.radius = '3'; 
				
				$tpl.find('.ebButtonContentContainer').css({
					borderRadius: '3px',
				});
			}
			
		}
		
		$tpl.attr('data-json', JSON.stringify( opt ));
	},
	titleEmailLength: function(){
		var $box = $('.et-top-header .h-edit-text');
		
		if ( $box.length ){
			var maxWidth = $('.step-nav-db, .step-nav-template-email').offset().left - $box.offset().left;
			
			$box.css('width', maxWidth-22);
			$box.find('.t').css('width', maxWidth-22);
			$box.css('max-width', 'none');
			$box.find('.t').css('max-width', 'none');
		}
	} 
};
$(document).ready(function() {
    page.init();
    page.colorBox();
    page.dragAndDropElements();
    page.actionsBtnBlock();
    page.isElements();
    page.updateIndividualElTpl();
    page.sortableImages();
    page.addImagesList();
    page.socialIconAction();
    page.sortableSocial();
    
    if ( $('.eb-box-code-editor').length ){
        page.codeBox.init();
    }
    
    if( $('.wrap-layout').length ){
        page.heightWrapLayout();
        $(window).resize(function(){
            page.heightWrapLayout();
        });
    }
    page.heightBodyTable();
	//page.resizeTinymce();
	page.titleEmailLength();
    $(window).resize(function(){
        page.heightBodyTable();
        page.updateColWidth1150();
		page.resizeTinymce();
		page.titleEmailLength();
    });
    page.updateColWidth1150();
    page.updatePageDesign();
	/*$('.btn-next').on('click', function(){
		page.updateLinkStyle();
	});*/
	
});
