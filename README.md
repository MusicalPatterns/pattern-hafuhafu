# Hafuhafu

rhythmic circularity; blocks within themselves

## kernel cycles

Start with a kernel, and make a cycle of kernels from it.

A kernel is the principal input of Hafuhafu. It's a short, repeating melody/ostinato/rhythm/contour/etc.

Each next kernel is the previous one, just with every other note removed. 
They have the same total notes though, because you keep playing it over and over,
so as long as the kernel length is odd, all elements are preserved,
so now they are simply in a new order.
For example a kernel [1,2,3,4,5] would become [2,4,1,3,5] because if you look at a sequence of [1,2,3,4,5] repeating:
1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,
and now take every other note:
2,4,1,3,5,2,4,1,3,5,
you can see we have a new repeating pattern.
If we simply dropped every other note, the notes in the new pattern would last twice as long, so the music would seem to go half as fast.
However, if we gradually increase the tempo to offset this impact, doubling it by the time we have faded out the departing notes,
then we arrive at a place very similar to where we started. 
We could repeat this process indefinitely.
[2,4,1,3,5] in turn becomes [4,3,2,1,5] which in turn becomes [3,1,4,2,5] which in turn returns to [1,2,3,4,5].
That's a kernel cycle.

## sieve

You don't always have to take just every other note. If you take every third note instead, that's sieve of 3.

## iteration

Each time a kernel has evolved into the next kernel, an iteration has completed.

## layer

Each iteration usually has several layers at different speeds, or pitches, or volumes.
Each layer usually spans multiple iterations, changing speed, pitch, or volume across them.

## sieve fractal

As the layer count increases, the sieve layers on top of itself. 
Some notes have only been sieved once, others twice, still others thrice.
The more you've been sieved, the more gone you are.

## mode

Two modes: droste and zeno. 
Two different popular conceptions of infinite process.

In droste mode, you are barreling through a tunnel of kernels within kernels. 
The previous one disappears around your periphery; the destination is infinitesimal in the distance. 
Layers fade in from nothing, have their day in the sun, then fade back out to nothing.
Each iteration's inactive layer is silent. 
It stands in the place for all the layers yet to come, still too far away and quiet to hear.

In zeno mode, you asymptotically approach a destination, but will never reach it.
Half of the notes keep dying away, but half always still remain.
Each iteration's inactive layer is at full gain. 

## progress

Progress gets measured in a few different ways, but all of them are normalized to a scalar between 0 and 1:
- element progress - a flat ratio of how many elements you are through the iteration to the total elements of the iteration, without respect to how long the notes are.
- duration progress - taking into account the duration of the notes (so if the pattern is slowing down, your duration progress will be ahead of the element progress at first before they catch up and tie at the end of each iteration)
- layer progress - if a layer spans 3 iterations, then it would be at layer progress 1/3 by the end of the first, 2/3 by the end of the second, and 3/3 by the end of the third.

Each of these progresses are helpful for calculating different things throughout the process.

## reverse

By default Hafuhafu speeds up and fades out, but you can also slow down and fade in!
