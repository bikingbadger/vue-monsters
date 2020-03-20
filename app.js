new Vue({
  el: '#app',
  data: {
    inPlay: false,
    playerPower: 100,
    monsterPower: 100,
    specialAttack: 2,
    healings: 2,
    attacks: [],
  },
  computed: {
    playerProgress: function() {
      const setWidth = this.playerPower > 0 ? this.playerPower : 0;
      return {
        width: setWidth + '%',
      };
    },
    monsterProgress: function() {
      const setWidth = this.monsterPower > 0 ? this.monsterPower : 0;
      return {
        width: setWidth + '%',
      };
    },
    disableSpecial: function() {
      const isSpecialDisabled = this.specialAttack === 0 ? true : false;
      return {
        'opacity-50': isSpecialDisabled,
        'cursor-not-allowed': isSpecialDisabled,
      };
    },
    disableHealing: function() {
      const isHealingDisabled = this.healings === 0 ? true : false;
      return {
        'opacity-50': isHealingDisabled,
        'cursor-not-allowed': isHealingDisabled,
      };
    },
    gameOver: function() {
      if (this.playerPower <= 0) return 'Monster Won';
      if (this.monsterPower <= 0) return 'You Won';

      return false;
    },
  },
  methods: {
    updateArray: function(playerHit, monsterHit) {
      this.attacks.push({ user: playerHit, monster: monsterHit });
    },
    getHit: function(power) {
      return Math.floor(Math.random() * power);
    },
    attack: function() {
      const playerHit = this.getHit(10);
      const monsterHit = this.getHit(10);
      this.playerPower =
        this.playerPower > playerHit ? this.playerPower - playerHit : 0;
      this.monsterPower =
        this.monsterPower > monsterHit ? this.monsterPower - playerHit : 0;
      this.updateArray(playerHit, monsterHit);
    },
    special: function() {
      const playerHit = this.getHit(5);
      const monsterHit = this.getHit(15);
      this.playerPower =
        this.playerPower > playerHit ? this.playerPower - playerHit : 0;
      this.monsterPower =
        this.monsterPower > monsterHit ? this.monsterPower - playerHit : 0;
      this.specialAttack--;
      this.updateArray(playerHit, monsterHit);
    },
    heal: function() {
      const playerHit = this.getHit(5);
      const monsterHit = this.getHit(5);
      this.playerPower += playerHit;
      this.monsterPower =
        this.monsterPower > monsterHit ? this.monsterPower - playerHit : 0;
      this.healings--;
      this.updateArray(playerHit, monsterHit);
    },
    restart: function() {
      this.playerPower = 100;
      this.monsterPower = 100;
      this.specialAttack = 2;
      this.healings = 2;
      this.attacks = [];
    },
  },
});
