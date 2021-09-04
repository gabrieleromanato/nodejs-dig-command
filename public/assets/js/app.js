"use strict";

$(function() {
    $( "#dns-lookup-form" ).on( "submit", function( e ) {
        e.preventDefault();
        $.post( "/api/lookup", $( this ).serialize(), function( output ) {
            $( "#result" ).text( output );
        });
    });
});