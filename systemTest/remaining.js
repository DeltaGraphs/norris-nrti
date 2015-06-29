/*
* Requirements:


*	FBOB3.2.3 			Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati del map chart.
*	FBOB3.2.3.1 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati del map chart con il metodo di aggiornamento in place.
*	FBDE3.2.3.2 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati del map chart con il metodo di aggiornamento stream.
*	FBOB3.2.3.3 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati del map chart con il metodo di aggiornamento movie.
*	FBOB3.2.4 			Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati della table.
*	FBOB3.2.4.1 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati della table con il metodo di aggiornamento in place.
*	FBOB3.2.4.2 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati della table con il metodo di aggiornamento stream.
*	FBDE3.2.5 			Il framework deve dare la possibilità all'utente sviluppatore di eliminare flussi di dati dai grafici.
*	FBDE3.3 			Il framework deve permettere all'utente sviluppatore di aggiornare i parametri dei grafici.
*	FBDE3.3.1 			Il framework deve permettere all'utente sviluppatore di aggiornare il titolo del grafico.
*	FBDE3.3.2 			Il framework deve permettere all'utente sviluppatore di aggiornare le dimensioni del grafico.
*	FBDE3.3.3 			Il framework deve dare la possibilità all'utente sviluppatore di modificare il formato di stampa dei dati nel grafico.
*	FBDE3.3.4 			Il framework deve dare la possibilità all'utente sviluppatore di modificare i parametri relativi alla legenda.
*	FBDE3.3.4.1 		Il framework deve dare la possibilità all'utente sviluppatore di modificare la possibilità di abilitare e disabilitare la legenda nel grafico.
*	FBDE3.3.4.2 		Il framework deve dare la possibilità all'utente sviluppatore di modificare la posizione della legenda nel grafico.
*	FBDE3.3.4.3 		Il framework deve dare la possibilità all'utente sviluppatore di modificare l'aspetto della legenda nel grafico.
*	FBDE3.3.5 			Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i parametri di un bar chart.
*	FBDE3.3.5.1 		Il framework deve consentire all'utente sviluppatore di aggiornare l'orientamento delle barre di un bar chart.
*	FBDE3.3.5.1.1 		Il framework deve consentire all'utente sviluppatore di aggiornare l'orientamento orizzontale delle barre di un bar chart.
*	FBDE3.3.5.1.2 		Il framework deve consentire all'utente sviluppatore di aggiornare l'orientamento verticale delle barre di un bar chart.
*	FBDE3.3.5.2 		Il framework deve permettere all'utente sviluppatore di aggiornare le impostazioni della griglia del bar chart.
*	FBDE3.3.5.2.1 		Il framework deve permettere all'utente sviluppatore di abilitare la griglia orizzontale del bar chart.
*	FBDE3.3.5.2.2 		Il framework deve permettere all'utente sviluppatore di disabilitare la griglia orizzontale del bar chart.
*	FBDE3.3.5.2.3 		Il framework deve permettere all'utente sviluppatore di abilitare la griglia verticale del bar chart.
*	FBDE3.3.5.2.4 		Il framework deve permettere all'utente sviluppatore di disabilitare la griglia verticale del bar chart.
*	FBDE3.3.5.3 		Il framework deve permettere all'utente sviluppatore di modificare il background al bar chart.
*	FBDE3.3.5.4 		Il framework deve dare la possibilità all'utente sviluppatore di modificare la possibilità di ordinamento delle barre del bar chart.
*	FBDE3.3.5.5 		Il framework deve dare la possibilità all'utente sviluppatore di modificare la visualizzazione stacked delle barre del bar chart.
*	FBDE3.3.5.6 		Il framework deve dare la possibilità all'utente sviluppatore di modificare la visualizzazione grouped delle barre del bar chart.
*	FBDE3.3.5.7 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare le proprietà degli assi di un bar chart.
*	FBDE3.3.5.7.1 		Il framework deve dare la possibilità all'utente sviluppatore di modificare il nome degli assi di un bar chart.
*	FBDE3.3.5.7.1.1 	Il framework deve dare la possibilità all'utente sviluppatore di modificare il nome delle ascisse dei bar chart.
*	FBDE3.3.5.7.1.2 	Il framework deve dare la possibilità all'utente sviluppatore di modificare il nome delle ordinate dei bar chart.
*	FBDE3.3.5.7.2 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare l'aspetto degli assi di un bar chart.
*	FBDE3.3.5.7.3 		Il framework deve dare la possibilità all'utente sviluppatore di modificare il range degli assi di un bar chart.
*	FBDE3.3.5.7.4 		Il framework deve dare la possibilità all'utente sviluppatore di modificare i tick degli assi di un bar chart.
*	FBDE3.3.5.7.5 		Il framework deve dare la possibilità all'utente sviluppatore di modificare la scala degli assi di un bar chart.
*	FBDE3.3.6 			Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i parametri di un line chart.
*	FBDE3.3.6.1 		Il framework deve permettere all'utente sviluppatore di aggiornare le impostazioni della griglia del line chart.
*	FBDE3.3.6.1.1 		Il framework deve permettere all'utente sviluppatore di abilitare/disabilitare la griglia orizzontale del line chart.
*	FBDE3.3.6.1.2 		Il framework deve permettere all'utente sviluppatore di abilitare/disabilitare la griglia verticale del line chart.
*	FBDE3.3.6.2 		Il framework deve permettere all'utente sviluppatore di modificare il background al line chart.
*	FBDE3.3.6.3 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare le proprietà degli assi di un line chart.
*	FBDE3.3.6.3.1 		Il framework deve dare la possibilità all'utente sviluppatore di modificare il nome degli assi di un line chart. 
*	FBDE3.3.6.3.1.11	Il framework deve dare la possibilità all'utente sviluppatore di modificare il nome delle ascisse dei line chart.
*	FBDE3.3.6.3.1.2 	Il framework deve dare la possibilità all'utente sviluppatore di modificare il nome delle ordinate dei line chart.
*	FBDE3.3.6.3.2 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare l'aspetto degli assi di un line chart.
*	FBDE3.3.6.3.3 		Il framework deve dare la possibilità all'utente sviluppatore di modificare il range degli assi di un line chart.
*	FBDE3.3.6.3.4 		Il framework deve dare la possibilità all'utente sviluppatore di modificare i tick degli assi di un line chart.
*	FBDE3.3.6.3.5 		Il framework deve dare la possibilità all'utente sviluppatore di modificare la scala degli assi di un line chart.
*	FBDE3.3.6.4 		Il framework deve dare la possibilità all'utente sviluppatore di modificare la visibilità del view finder del line chart.
*	FBDE3.3.7 			Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i parametri di un map chart.
*	FBDE3.3.7.1 		Il framework deve consentire all'utente sviluppatore di aggiornare il punto centrale del map chart.
*	FBDE3.3.7.2 		Il framework deve consentire all'utente sviluppatore di aggiornare la scala del map chart.
*	FBDE3.3.7.3 		Il framework deve consentire all'utente sviluppatore di modificare il tipo della mappa del map chart. 
*	FBDE3.3.7.4 		Il framework deve consentire all'utente sviluppatore di modificare la possibilità di zoomare nel map chart.
*	FBDE3.3.7.5 		Il framework deve consentire all'utente sviluppatore di modificare la possibilità di effettuare il trascinamento nel map chart.
*	FBDE3.3.7.6 		Il framework deve consentire all'utente sviluppatore di modificare le impostazioni della griglia nel map chart.
*	FBDE3.3.7.6.1 		Il framework deve permettere all'utente sviluppatore di abilitare la griglia orizzontale del map chart.
*	FBDE3.3.7.6.2 		Il framework deve permettere all'utente sviluppatore di abilitare la griglia verticale del map chart.
*	FBDE3.3.7.6.3 		Il framework deve permettere all'utente sviluppatore di disabilitare la griglia orizzontale del map chart.
*	FBDE3.3.7.6.4 		Il framework deve permettere all'utente sviluppatore di disabilitare la griglia verticale del map chart.
*	FBDE3.3.8 			Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i parametri di una table.
*	FBDE3.3.8.1 		Il framework deve permettere all'utente sviluppatore di modificare i campi dell'intestazione di una table.
*	FBDE3.3.8.2 		Il framework deve dare la possibilità all'utente sviluppatore di modificare il numero massimo di elementi visualizzati nella table.
*	FBDE3.3.8.3 		Il framework deve dare la possibilità all'utente sviluppatore di modificare la posizione di aggiunta dei dati in una table.
*	FBOB3.3.8.3.1 		Il framework deve dare la possibilità all'utente sviluppatore di impostare la posizione di inserimento in testa dei dati in una table.
*	FBDE3.3.8.3.2 		Il framework deve dare la possibilità all'utente sviluppatore di impostare la posizione di inserimento in coda dei dati in una table.
*	FBDE3.3.8.4 		Il framework deve dare la possibilità all'utente sviluppatore di modificare l'ordinamento dei dati in una table, in base ad una colonna.
*	FBDE3.3.8.4.1 		Il framework deve dare la possibilità all'utente sviluppatore di modificare l'ordinamento dei dati in una table, in base a più colonne.
*	FBDE3.3.8.5 		Il framework deve consentire all'utente sviluppatore di modificare la griglia nella table.
*	FBDE3.3.8.5.1 		Il framework deve permettere all'utente sviluppatore di abilitare la griglia orizzontale della table.
*	FBDE3.3.8.5.2 		Il framework deve permettere all'utente sviluppatore di abilitare la griglia verticale della table.
*	FBDE3.3.8.5.3 		Il framework deve permettere all'utente sviluppatore di disabilitare la griglia orizzontale della table.
*	FBDE3.3.8.5.4 		Il framework deve permettere all'utente sviluppatore di disabilitare la griglia verticale della table.
*	FBOB4 				Le comunicazioni tra le componenti del framework avverranno tramite scambio di dati in formato JSON.
*	FBOB5				È richiesta l'implementazione di un meccanismo di routing su cui si appoggerà il framework.
*	FBOB6 				I dati verranno visualizzati in formato HTML dal front end.

* <<Requirements into brackets are not satisfied>>
*/