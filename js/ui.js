var ui = {
  /**
  * comment  : 초기화
  * param    : 
  * @author  : kimjaeseong
  * @date    : 2020-10-28
  */
  fxInit  : function(){
    ui.fxUserAgent();
    ui.fxInputClear($('.ui.input input[type=text], .ui.input textarea, .ui.input input[type=password]'), $('.ui.input .clear'));
    ui.fxCardFilp($('.ui.card.card-h'));
    ui.fxReply($('.form.reply'));
    ui.fxMore($('.fn-more-toggle'));
    ui.fxViewMore();
    ui.fxAddfile();
    ui.fxRightTopCount();
    ui.fxPopShadowControl();
    ui.fxInterestChannel();
    ui.fxQuick();
    ui.fxCollegeGnb();
  },
  /**
    * comment  : userAgent
    * param    : 
    * @author  : kimjaeseong
    * @date    : 2020-10-28
    */
  fxUserAgent : function(){
    if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (navigator.userAgent.toLowerCase().indexOf("msie") != -1) ) {
      $('body').addClass('msie');
    }
  },
  /**
  * comment  : input [type='text']태그와 i.clear 버튼 처리
  * param    : 인풋(jquery selector), 삭제버튼(jquery selector)
  * @author  : kimjaeseong
  * @date    : 2020-10-28, 2019-11-12(.right-top-count 처리 추가), 2019-11-29 clear버튼 누를때 .removeClass('error') 추가
  */
  fxInputClear : function(input, clear){
    input.each(function(){
      if($(this).val().length > 0){
        $(this).closest('.ui.input').addClass('write');
      }
    })
    input.bind({
      'focusin' :  function(){
        $(this).closest('.ui.input').addClass('focus');
      },
      'focusout' : function(){
        $(this).closest('.ui.input').removeClass('focus');
      }
    })
    input.bind('keyup', function(){
      if($(this).val().length > 0){
        $(this).closest('.ui.input').addClass('write');
      }else{
        $(this).closest('.ui.input').removeClass('write');
      }
    })
    clear.bind('click', function(){
      $(this).closest('.ui.input').removeClass('write').find('input').val('');
      if($(this).closest('.ui.input').hasClass('right-top-count')){
        $(this).closest('.ui.input').removeClass('error').find('.count .now').text('0');
      }
    })
  },
  /**
    * comment  : 카드 hover
    * param    : 카드(jquery selector)
    * @author  : kwoneunbyeol
    * @date    : 2020-10-31
    */
   fxCardFilp : function(obj){
    obj.on('mouseenter',function(){
        $(this).addClass('on');
    }).on('mouseleave',function(){
        $(this).removeClass('on');
    });
  },
  /**
    * comment  : 덧글 입력창 숫자 카운터, 최대치 넘었는지 비교
    * param    : 덧글입력창(jquery selector)
    * @author  : kimjaeseong
    * @date    : 2020-10-31
    */
  fxReply : function(obj){
    obj.find('textarea').bind({
      'focus' : function(){
        $(this).closest('.reply.form').addClass('focus');
      },
      'focusout' : function(){
        $(this).closest('.reply.form').removeClass('focus');
      },
      'keyup' : function(){
        var _form = $(this).closest('.reply.form');
        var _byte = 0;
        var _val = this.value;
        var _max = _form.find('.max').text();
        var _now = _form.find('.now');
        var _charStr;
        for (var i = 0; i < _val.length; i++) { 
          _charStr = _val.charAt(i); 
          if (escape(_charStr).length > 4) { 
            _byte += 2; 
          } else { 
            _byte++; 
          } 
        }
        if(_byte > 0){ // submit 가능
          _form.addClass('active');
        }else{
          _form.removeClass('active');
        }
        if(_byte > _max){ // 글자수 초과
          _form.addClass('error');
        }else{
          _form.removeClass('error');
        }
        _now.text(_byte);
      }
    })
  },
  /**
    * comment  : 인풋 우상단 카운팅
    * param    : 
    * @author  : kimjaeseong
    * @date    : 2020-11-05, 2019-11-25(초기 진입시 입력값있으면 카운팅)
    */
  fxRightTopCount : function(){
    $('.right-top-count textarea, .right-top-count input[type=text]').bind({
      'keyup' : function(){
        var _form = $(this).closest('.right-top-count');
        var _byte = 0;
        var _val = this.value;
        var _max = _form.find('.max').text();
        var _now = _form.find('.now');
        var _charStr;
        for (var i = 0; i < _val.length; i++) { 
          _charStr = _val.charAt(i); 
          if (escape(_charStr).length > 4) { 
            _byte += 2; 
          } else { 
            _byte++; 
          } 
        }
        if(_byte > _max){ // 글자수 초과
          _form.addClass('error');
        }else{
          _form.removeClass('error');
        }
        _now.text(_byte);
      }
    });
    $('.right-top-count textarea, .right-top-count input[type=text]').each(function(){
      var _form = $(this).closest('.right-top-count');
      var _byte = 0;
      var _val = this.value;
      var _max = _form.find('.max').text();
      var _now = _form.find('.now');
      var _charStr;
      for (var i = 0; i < _val.length; i++) { 
        _charStr = _val.charAt(i); 
        if (escape(_charStr).length > 4) { 
          _byte += 2; 
        } else { 
          _byte++; 
        } 
      }
      if(_byte > _max){ // 글자수 초과
        _form.addClass('error');
      }else{
        _form.removeClass('error');
      }
      _now.text(_byte);
    })
  },
  /**
    * comment  : more/hide button click 시 .open toggle
    * param    : more/hide button (jquery selector)
    * @author  : kwoneunbyeol
    * @date    : 2020-11-01
    */
  fxMore : function(obj){
    obj.on('click',function(){
      $(this).parents('.fn-parents').toggleClass('open');
    });
  },
  /**
    * comment  : 댓글리스트 View more 노출 여부 결정 & 클릭스 노출 기능 추가
    * param    : 
    * @author  : kimjaeseong
    * @date    : 2020-11-04
    */
  fxViewMore : function(obj){
    $('.comment .ellipsis').each(function(){
      if($(this).height() >= $(this).find('span:not(".tag")').height()){
        $(this).closest('.text').find('button').hide();
      }
    })
    $('.comment .text .ellipsis ~ button').bind('click', function(){
      $(this).closest('.text').find('.ellipsis').addClass('expend');
    })
  },
  /**
    * comment  : 파일첨부 추가 삭제
    * param    : 
    * @author  : kimjaeseong
    * @date    : 2020-11-05, 2019-11-11(focus처리 추가)
    */
  fxAddfile : function(){
    $('.ui.file label').on('click', function(){
      $(this).closest('.ui.file').addClass('focus');
    })
    $('.ui.file input[type=file]').on('change', function(){
      $(this).closest('.ui.file').removeClass('focus');
      $(this).closest('.ui').addClass('active').find('input[type=text]').val($(this).val());
    })
    $('.ui.file i.clear').bind('click', function(){
        $(this).closest('.ui').removeClass('active').find('input[type=file]').attr('type', '').attr('type', 'file');
    })
  },
  /**
    * comment  : 팝업 내부 스크롤시 하단 그림자 추가
    * param    : 
    * @author  : kimjaeseong
    * @date    : 2020-11-05
    */
  fxPopShadowControl : function(){
    $('.ui.modal [class^=scrolling-').bind('scroll', function(){
      if($(this).scrollTop() !== 0){
        $(this).closest('.ui.modal').addClass('inner-scroll');
      }else{
        $(this).closest('.ui.modal').removeClass('inner-scroll');
      }
    })
  },
  /**
    * comment  : 업로드 이미지 파일 미리보기
    * param    : <input type="file" />, <img> (jquery selector)
    * @author  : kimjaeseong
    * @date    : 2020-11-07
    */
   fxImageUploadPreview : function(file, img){
    file.on('change', function(){
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          img.attr('src', e.target.result).show();
        }
        reader.readAsDataURL(this.files[0]);
      }
    });
  },
  /**
    * comment  : 관심 Channel 토글
    * param    : 
    * @author  : kimjaeseong
    * @date    : 2020-11-11, 2019-11-15 (IE에서 높이 계산이 정확하지 않아서 toggleBtn.hide(); 조건 수정)
    */
  fxInterestChannel : function(){
    var wrap = $('.table-css.type2 .item-wrap'),
      belt = $('.table-css.type2 .item-wrap .belt').outerHeight(),
      labelHeight = $('.table-css.type2 .item-wrap .belt .ui').eq(0).outerHeight(true);
      toggle = $('.table-css.type2 .toggle-btn');
      toggleBtn = $('.table-css.type2 .toggle-btn button');

    if(belt <= labelHeight+1){ // 1줄일 경우
      toggleBtn.hide();
    }
    toggleBtn.bind('click', function(){
      toggle.toggleClass('active');
      if(toggle.hasClass('active')){
        wrap.addClass('active');
      }else{
        wrap.removeClass('active');
      }
    })
  },
  /**
    * comment  : 퀵메뉴 다른곳 클릭시 닫힘
    * param    : 
    * @author  : kimjaeseong
    * @date    : 2020-11-14
    */
   fxQuick : function(){
    $('.q-group a, .q-group button').bind({
      'click focusin' : function(){
          $('.quick').data('check', true);
      },
      'focusout' : function(){
        $('.quick').data('check', false);
        setTimeout(function(){
          if($('.quick').data('check')){
            $('.quick').data('check', false);
          }else{
            $('button.quick').removeClass('active');
          }
        }, 100);
      }
    })
  },
  /**
    * comment  : College Gnb
    * param    : 
    * @author  : kimjaeseong
    * @date    : 2020-12-06
    */
  fxCollegeGnb : function(){
    $(document).on('click', '.g-menu-detail .detail-open', function(){
      $(this).closest('.g-menu-detail').find('.layer').toggle();
    })
  }
}

