// import here !!!
import loading from './loading';
import mapping from "./mapping";


// Script Cho Tab
class Tab {
	selector;
	titleList;
	contentList;

	constructor(selector) {
		this.selector = document.querySelector(selector);
		if (this.selector) {
			this.titleList = this.selector.querySelectorAll("[toggle-for]")
			this.contentList = this.selector.querySelectorAll("[tab-id]")
			this.init();
		}
	}

	runTabWhenClicked() {
		Array.prototype.forEach.call(this.titleList, (element, index) => {
			element.addEventListener("click", e => {
				e.preventDefault();
				const tabTarget = element.attributes["toggle-for"].value;
				const targetDOM = this.selector.querySelector(`[tab-id='${tabTarget}']`);
				element.classList.add("active");
				Array.prototype.forEach.call(this.titleList, (eleClicked, eleClickedIndex) => {
					if (eleClickedIndex != index) {
						eleClicked.classList.remove("active")
					}
				});
				Array.prototype.forEach.call(this.contentList, (tabContentElement) => {
					if (tabContentElement.attributes["tab-id"].value != tabTarget) {
						tabContentElement.style.display = "none"
						tabContentElement.classList.remove("show")
					}
				});
				targetDOM.style.display = "block",
					setTimeout(() => {
						targetDOM.classList.add("show")
					}, 50);
			})
		})
	}

	activeFirstTab() {
		this.titleList[0].click();
	}

	init() {
		this.runTabWhenClicked();
		this.activeFirstTab();
	}
}

// CONTROL SVG
const SVG = () => {
	jQuery('img.svg').each(function() {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');
	});
}

// SHOW MENU IN MOBILE
function showMenuMobile() {
	$('.button-mobile').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).siblings('.list-nav').toggleClass('active');
		$('body').toggleClass('disabled');
		$('.overlay').toggleClass('active');
	});

	$('.overlay').click(function(e) {
		e.preventDefault();
		$(this).removeClass('active')
		$('.list-nav').removeClass('active');
		$('body').removeClass('disabled');
		$('.button-mobile').toggleClass('active');
	});
}

function sliderBeforeAfter() {
	var swiper = new Swiper('.slider-before-after .swiper-container', {
		speed: 1000,
		slidesPerView: 1,
		loop: true,
		autoplay: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})
}

function scrollMenu() {
	$('.item-nav, footer .list-link .item').on('click', function() {
		$('.list-nav').removeClass('active');
		$('body').removeClass('disabled');
		$('.button-mobile').toggleClass('active');
		$('.overlay').toggleClass('active');

		let url = $(this).attr('data-href');
		$('html, body').animate({
			scrollTop: $(url).offset().top - 150 // Means Less header height
		}, 1000);
	});
}

const clickGoTop = () => {
	let goTopButton = document.getElementById('button-to-top')
	goTopButton.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})
}

function AjaxSubmitForm() {
	$('.block-subscribe #submit-form, .block-form-index-3 #submit-form').on('click', function(e) {
		e.preventDefault()
		const url = $(this).attr('data-url');
		const name = $(this).parents('.block-form').find("#name").val();
		const phone = $(this).parents('.block-form').find("#phone").val();
		const email = $(this).parents('.block-form').find("#email").val();
		const recaptcha = $('#recaptcha').val();
		$.ajax({
			type: "POST",
			url: url,
			data: {
				name: name,
				phone: phone,
				email: email,
				recaptcha: recaptcha
			},
			error: function(error) {},
			success: function(response) {}
		});
	});
}

// CHẠY KHI DOCUMENT SẴN SÀNG
document.addEventListener('DOMContentLoaded', () => {
	// LOADING
	loading();
	// WOW
	new WOW().init();
	// SVG CONTROL
	SVG();
	// GOT TO TOP
	clickGoTop();
	// SLIDER
	sliderBeforeAfter();
	// MEMU
	showMenuMobile();
	scrollMenu();
	AjaxSubmitForm();
});

// CHẠY KHI WINDOWN SCROLL
window.addEventListener('scroll', () => {})