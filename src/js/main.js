jQuery(document).ready(function($){
	var contentSections = $('.cd-section'),
		navigationItems = $('#cd-vertical-nav a');

	updateNavigation();
	resetStyles();
	sizeGalleryImages();
	//sizeSideText();

	$(window).on('scroll', function(){
		updateNavigation();
	});

	$(window).on('resize', function(){
		resetStyles();
		sizeGalleryImages();
		//sizeSideText();
	});

	//smooth scroll to the section
	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    //smooth scroll to page top
    $('.cd-scroll-top').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    //open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function(){
    	$('.touch #cd-vertical-nav').toggleClass('open');
  
    });
    //close navigation on touch devices when selectin an elemnt from the list
    $('.touch #cd-vertical-nav a').on('click', function(){
    	$('.touch #cd-vertical-nav').removeClass('open');
    });

	function updateNavigation() {
		contentSections.each(function(){
			$this = $(this);
			var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).addClass('is-selected');
			}else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{ 
				'scrollTop':target.offset().top,
			},
        	1000, "easeOutCubic"
        );
	}

	function resetStyles(){
		var windowWidth = window.innerWidth;
		var skillList = $('.skills-list');
		var dropdown = $('.dropdown');
	
		if( windowWidth > 1280 ) {
			skillList.each( function( target 	 ){
				$(this).css( { display: 'block' });
			});
		} else if( windowWidth <= 1280 ){
			dropdown.each( function(){
				$(this).removeClass('active');
			});
			skillList.each( function( target ){
				$(this).css( { display: 'none' });
			});
		}
		
	}

	function sizeGalleryImages() {

		var windowWidth = window.innerWidth;
		var imageItem = $('.grid-item');

		imageItem.each( function() {
			var width = $(this).width();
			if( windowWidth <= 1080 && $(this).hasClass('last-item') ){
				$(this).css({ height: '' + width * 0.6 + '' });
			} else {
				$(this).css({ height: '' + width * 1.4 + '' });
			}
		});

	}

	function sizeSideText() {

		var sideText = $('.absolute-side-text');
		var footerHeight = $('#section-contact').height();

		sideText.css({ height: '' + 0 + '' });
		
		var height = $(document).height() - footerHeight - 100;
		console.log($(document).height());

		sideText.css({ height: '' + height + '' });
	}


	$(".single-skills-list").on('click', function(){

		var parent = $(this).find('.dropdown');
		var windowWidth = window.innerWidth;
		var skillList = $(this).find("#dropdownList");
		
		if( windowWidth <= 1280 ) {

			if( parent.hasClass("active") ) {
				parent.removeClass("active");
			} else {
				parent.addClass("active");
			}

			skillList.slideToggle( 500, "easeOutCubic" );
		}

		
	  });


	$('.grid-item, .modal-container-full').on('click', function(){

		var modal = $('.modal-container-full');
		var textContainer = $('.modal-text-container');
		var target = $(this);

		if( modal.hasClass('active') ) {

			modal.removeClass('active');
			modal.addClass('hidden');
			window.setTimeout(function(){
				modal.css( { display: 'none' } );
			}, 500 );


		} else if( modal.hasClass('hidden') ) {

			var imageContainer = $('.modal-image-container');
			
			var dataItem = $(this).data("image");
			var description = target.find('.description').clone();
			
			var srcString = '../img/gallery/img' + dataItem + '.jpg';
			imageContainer.css('background-image', 'url(' + srcString + ')');

			textContainer.html( description );

			modal.removeClass('hidden');
			modal.css( { display: 'flex' } );
			modal.addClass('active');
		}



		
	});


});