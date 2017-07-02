$(document).ready(() => {

    let displayBarItem = 'A',
        totalDisplayBar = 0,
        selected = false;

    $('.optionButton').on('click', (e) => {

        e.stopPropagation();
        if($('#dropdown').is(':visible')){
          $('#dropdown').fadeOut('slow');
        } else {
          $('#dropdown').animate({'width': 'show'});
        }

    });

    $(document).click(function(e){
        if(!$('#dropdown').is(':visible'))
            return;

        if($(e.target).closest('#dropdown').length)
            return;

        if($(e.target).closest('#quantity').length)
            return;

        $('#dropdown').fadeOut('slow');
    })


    $('select').change(() => {
        displayBarItem = $('select option:selected').text();
        if(selected){
          displayBarGen(displayBarItem, totalDisplayBar);
        } else {
          $('#quantity').addClass('highlight');
        }
    });

    $('#quantityForm').on('submit', () => {
        totalDisplayBar = $('#quantity').val();
        displayBarGen(displayBarItem, totalDisplayBar);
        selected = true;
        $('#quantity').removeClass('red');
    });

    $('.active').show();
});


function displayBarGen(item, number){
    let output = '';
    $('#display').html(output);  //clear display initally
    let slider = `
        <div class="slideButton">
          <button onclick="prevSlide()">&lt;</button><button onclick="nextSlide()">&gt;</button>
        </div>
    `;

    let footer = `
      <div class="obj3">
        <span>OBJ3</span>
      </div>
    `;


    //dynamically creating divs and assigning one divs per page
    let totalDivs = Math.ceil(number/3),
        divs = '';
    for(i=1;i<=totalDivs;i++){
      divs = `
          <div class="display div${i}"></div>
      `;
      $('#display').append(divs);
    }

    //dynamically creating displaybar and assigning maximum of three displaybar per div
    let outputCounter = 0,
        divCounter = 1;
    for(j=1; j<=number; j++){
      output += `
          <div class="displayBar">
              <div class="leftDisplayBar">${j}</div>
              <div class="rightDisplayBar">Item ${item}${j}</div>
          </div>
      `;
      outputCounter++;

      if((outputCounter % 3) == 0 || outputCounter == number){
        $(".div"+ divCounter).append(output, slider, footer);
        divCounter++;
        output = '';
      }
    }


    $('.display').first().addClass('active');
    $('.display').hide();
    $('.active').show();

};

function nextSlide(){
    $('.active').removeClass('active').addClass('oldActive');
    if($('.oldActive').is(':last-child')){
      $('.display').first().addClass('active');
    } else {
      $('.oldActive').next().addClass('active');
    }

    $('.oldActive').removeClass('oldActive');
    $('.display').hide();
    $('.active').show();
};

function prevSlide(){
    $('.active').removeClass('active').addClass('oldActive');
    if($('.oldActive').is(':first-child')){
      $('.display').last().addClass('active');
    } else {
      $('.oldActive').prev().addClass('active');
    }

    $('.oldActive').removeClass('oldActive');
    $('.display').hide();
    $('.active').show();
};
