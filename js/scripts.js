// Wait until the DOM is loaded...
function start(){
	$(document).ready(function(){
		// console.log("test")
		// All api calls go to the this link
		const apiBaseUrl = 'http://api.themoviedb.org/3';
		// All images use this link
		const imageBaseUrl = 'http://image.tmdb.org/t/p/';

		const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key='+apiKey
		// console.log(nowPlayingUrl);

		// Make AJAX request to the nowPlayingUrl
		// console.log(nowPlayingUrl)
		$.getJSON(nowPlayingUrl,function(nowPlayingData){
			// console.log(nowPlayingData);
			var nowPlayingHTML = getHTML(nowPlayingData);
			$('#movie-grid').html(nowPlayingHTML);
			$('.movie-poster').click(function(event){
				// Change the HTML inside the modal
				// var thisMovieId = $(this).attr('movie-id');
				var thisMovieId = event.target.parentElement.attributes[1].value;
				// console.log(thisMovieId)
				var thisMovieUrl = `${apiBaseUrl}/movie/${thisMovieId}?api_key=${apiKey}`;
				$.getJSON(thisMovieUrl,function(thisMovieData){
					// console.log(thisMovieData);
					$('#myModalLabel').html(thisMovieData.title);
					$('.modal-body').html(thisMovieData.overview);
					// Open teh modal
					$("#myModal").modal();
				});
			});
		});

		

		$('#movie-form').submit(function(event){
			// Dont submit form! JS will handle
			event.preventDefault();
			var userInput = $('#search-input').val();
			$('#search-input').val('');
			var safeUserInput = encodeURI(userInput);
			var searchUrl = apiBaseUrl + '/search/movie?query='+safeUserInput+'&api_key='+apiKey;
			// console.log(searchUrl);
			$.getJSON(searchUrl,function(searchMovieData){
				var searchMovieHTML = getHTML(searchMovieData);
				$('#movie-grid').html(searchMovieHTML);
			$('.movie-poster').click(function(event){
				// Change the HTML inside the modal
				// var thisMovieId = $(this).attr('movie-id');
				var thisMovieId = $(this).attr('movie-id');
				// console.log(thisMovieId)
				var thisMovieUrl = `${apiBaseUrl}/movie/${thisMovieId}?api_key=${apiKey}`;
				$.getJSON(thisMovieUrl,function(thisMovieData){
					// console.log(thisMovieData);
					$('#myModalLabel').html(thisMovieData.title);
					$('.modal-body').html(thisMovieData.overview);
					// Open teh modal
					$("#myModal").modal();
				});
			});
			})
		})

		function getHTML(data){
			// console.log(data.results[0].id)
			var newHTML = '';
			for(let i = 0; i < data.results.length; i++){
				var posterUrl = imageBaseUrl + 'w300' + data.results[i].poster_path;

				newHTML += '<div class="col-sm-6 col-md-3 movie-poster" movie-id='+data.results[i].id+'>';
					newHTML += `<img src="${posterUrl}">`;
				newHTML += `</div>`;
			}
			return newHTML;
		}

		$('.home-button').click(function(){
			// alert('Home button clicked!')
			start()
		})

	});
	// var posterHeight = $(this).height
	// console.log(posterHeight)
}
start()

