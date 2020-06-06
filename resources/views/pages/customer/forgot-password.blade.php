@extends('layout')

@section('content')

    <c-breadcrumb pages="{{json_encode( $pages )}}"></c-breadcrumb>
    <div id="primary" class="content-area">
        <main id="main" class="site-main">
            <c-forgot-pass token="{{$token}}"></c-forgot-pass>
        </main>
    </div>
    <vue-snotify></vue-snotify>

@stop
