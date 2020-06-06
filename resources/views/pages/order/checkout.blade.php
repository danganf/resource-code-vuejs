@extends('layout-min')

@section('content')

    <c-breadcrumb pages="{{json_encode( $pages )}}"></c-breadcrumb>
    <div id="primary" class="content-area">
        <main id="main" class="site-main">
            <c-checkout></c-checkout>
        </main>
    </div>
    <vue-snotify></vue-snotify>

@stop
