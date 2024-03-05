import { trigger, state, style, transition, animate } from '@angular/animations';

export const slideIn = trigger('slideIn', [
  state('*', style({
    transform: 'translateX(100%)',
  })),
  state('in', style({
    transform: 'translateX(0)',
  })),
  state('out',   style({
    transform: 'translateX(-100%)',
  })),
  transition('* => in', animate('600ms ease-in')),
  transition('in => out', animate('600ms ease-in'))
]);

export const inOutAnimation = trigger(
    'inOutAnimation', 
    [
      transition(
        ':enter', 
        [
          style({ height: 0, opacity: 0 }),
          animate('1s ease-out', 
                  style({ height: 300, opacity: 1 }))
        ]
      ),
      transition(
        ':leave', 
        [
          style({ height: 300, opacity: 1 }),
          animate('1s ease-in', 
                  style({ height: 0, opacity: 0 }))
        ]
      )
    ]
)

export const detailExpand =  trigger('detailExpand', [
    state('collapsed', style({height: '0px', minHeight: '0'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);

export const hoverExpand = trigger('hoverExpand', [
    state('collapsed', style({width: '0px', minWidth: '0', opacity: '0'})),
    state('expanded', style({width: '75px', opacity: '1'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);

export const rotate = trigger('rotate', [
    state('right', style({ transform: 'rotate(0deg)'})),
    state('bottom', style({ transform: 'rotate(90deg)'})),
    transition('right <=> bottom', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);