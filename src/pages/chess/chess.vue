<template>
  <div class="page-container">
    <chessboard class="chessboard" v-show="!historyshow" :iconDir="iconDir" :pgn="pgn" :side="side" v-on:change="boardChange($event)"></chessboard>
    <div id="historybox" v-if="historyshow" style="margin: 20px">
      <div v-for="item in gamehistory" style="margin-bottom: 10px; border: 1px solid darkgrey; font-size: 30px">
        <div>Time: {{item.created_at | moment("dddd, MMMM Do YYYY HH:MM") }}</div>
        <div>White: {{item.player1}}</div>
        <div>Black: {{item.player2}}</div>
        <div class="pgnstring">
          {{item.pgn}}
        </div>

      </div>

    </div>
    <div class="controls" style="margin-top: 20px">
      <!--<a class="button" v-on:click="randomMove()">Random</a>-->
      <a class="button" v-if="!startnew && !historyshow" v-on:click="startnew = true">New Game</a>
      <a class="button" v-if="!historyshow" v-on:click="getHistory()">History</a>
      <a class="button" v-if="historyshow" v-on:click="historyshow = false">Close</a>
      <div v-if="startnew" id="players">
          Black:<br>
          <input type="text" v-model="blackplayer" name="firstname" value="Mickey"><br>
          White:<br>
          <input type="text" v-model="whiteplayer" name="lastname" value="Mouse"><br><br>
        <a class="button" v-on:click="reset()">Start</a>
      </div>
      <!--<a class="button" v-on:click="swapSides()">Swap</a>-->
      <!--<pre>{{ game.ascii() }}</pre>-->
      <div v-show="!historyshow" style="font-size: 30px">{{whiteplayer}} vs {{blackplayer}}</div>
      <div v-show="!historyshow" style="font-size: 30px">{{pgn}}</div>
    </div>
  </div>
</template>

<script src="./chess.js"></script>

<style scoped lang="scss">
@import '../../_variables';

.page-container {
  display: flex;
  flex-direction: row;

  @include media('medium') {
    flex-direction: column;
  }
}

.chessboard {
  flex: 1;
  flex-basis: 70%;
  max-width: 100vh;
}

.controls {
  flex: 0;
  flex-basis: 30%;
}

</style>
